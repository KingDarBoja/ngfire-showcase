import { Inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  QueryFn,
  SetOptions,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, mapTo, tap, timeoutWith } from 'rxjs/operators';
import { environment } from '@ngfire-showcase/web/core/environments';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface FirestoreBaseService<T> {
  doc$(id: string): Observable<T>; // Read: Get
  collection$(): Observable<T[]>; // Read: List
  create$(value: T): Observable<string>;
  upsert$(value: Partial<T>, setOptions?: SetOptions): Observable<string>
  update$(id: string, value: Partial<T>, setOptions?: SetOptions): Observable<string>;
  delete$(id: string): Observable<void>;
}

/**
 * Wrapper Firestore Service to control any AngularFire changes and do not
 * affect inherited classes.
 *
 * Some stuff was based on ngxs and articles to keep things simple for learning.
 * See more at the following links:
 * - https://github.com/ngxs-labs/firestore-plugin/blob/master/src/lib/ngxs-firestore.service.ts
 * - https://www.toptal.com/angular/state-management-in-angular-using-firebase
 * - https://indepth.dev/posts/1322/firebase-ngxs-the-perfect-couple
 */
@Injectable()
export abstract class FirestoreService<T> implements FirestoreBaseService<T> {
  protected abstract basePath: string;
  protected idField = 'id';
  // TODO: Not used atm
  protected converter: firebase.firestore.FirestoreDataConverter<T> = {
    toFirestore: (modelObject: T): DocumentData => {
      return modelObject;
    },
    // toFirestore: (modelObject: Partial<T>, options: SetOptions) => {
    //   return modelObject;
    // },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions
    ): T => {
      return { ...snapshot.data(options) };
    },
  };

  constructor(@Inject(AngularFirestore) protected afs: AngularFirestore) {}

  createId(): string {
    return this.afs.createId();
  }

  doc$(id: string) {
    return this.doc(id)
      .snapshotChanges()
      .pipe(
        map((docSnapshot) => {
          return docSnapshot.payload.exists
            ? this.getDataWithId(docSnapshot.payload)
            : undefined;
        }),
        tap((res) => {
          if (!environment.production) {
            console.groupCollapsed(
              `Firestore Streaming [${this.basePath}] [doc$] ${id}`
            );
            console.log(res);
            console.groupEnd();
          }
        })
      );
  }

  collection$(queryFn?: QueryFn) {
    return this.afs
      .collection<T>(this.basePath, (ref) => {
        return queryFn(ref);
        // return queryFn(ref.withConverter(this.converter));
      })
      .snapshotChanges()
      .pipe(
        map((docSnapshots) =>
          docSnapshots.map((docSnapshot) => {
            return this.getDataWithId(docSnapshot.payload.doc);
          })
        ),
        tap((res) => {
          if (!environment.production) {
            console.groupCollapsed(
              `Firestore Streaming [${this.basePath}] [collection$]`
            );
            console.table(res);
            console.groupEnd();
          }
        })
      );
  }

  create$(value: T) {
    return this.upsert$(value).pipe(
      tap((id) => {
        if (!environment.production) {
          console.groupCollapsed(
            `Firestore Service [${this.basePath}] [create]`
          );
          console.log('[Id]', id, value);
          console.groupEnd();
        }
      })
    );
  }

  update$(id: string, value: Partial<T>, setOptions?: SetOptions) {
    return this.docSet(id, value as T, setOptions);
  }

  delete$(id: string) {
    return from(this.afs.doc(id).delete()).pipe(
      tap(() => {
        if (!environment.production) {
          console.groupCollapsed(
            `Firestore Service [${this.basePath}] [delete]`
          );
          console.log('[Id]', id);
          console.groupEnd();
        }
      })
    );
  }

  upsert$(value: Partial<T>, setOptions?: SetOptions) {
    let id: string;
    let newValue: Partial<T>;

    if (Object.keys(value).includes(this.idField) && !!value[this.idField]) {
      id = value[this.idField];
      newValue = Object.assign({}, value);
    } else {
      id = this.createId();
      newValue = Object.assign({}, value, { [this.idField]: id });
    }

    return this.docSet(id, newValue as T, setOptions);
  }

  private getDataWithId<TData>(
    doc: QueryDocumentSnapshot<TData>
  ): TData & { [idField: string]: string } {
    const data: TData = doc.data();
    const id: string = (data && data[this.idField]) || doc.id;
    return { ...data, [this.idField]: id };
  }

  private doc(id: string): AngularFirestoreDocument<T> {
    return this.afs.doc(this.docRef(id));
  }

  /**
   * Create / update a document in the collection. Note that the AngularFire
   * definition of `set()` does not match at all the one from firebase-js-sdk.
   *
   * See links below:
   * - [AngularFire Document Set](https://github.com/angular/angularfire/blob/master/src/firestore/document/document.ts#L42)
   * - [Firebase JS SDK Document Set](https://github.com/firebase/firebase-js-sdk/blob/master/packages/firestore/src/api/database.ts#L718)
   *
   * @param id
   * @param value
   * @param setOptions
   */
  private docSet(
    id: string,
    value: T,
    setOptions?: SetOptions
  ): Observable<string> {
    setOptions = setOptions || { merge: true };

    // TODO: Why the ngxs-firestore adapter did this!?
    if (this.isOffline()) {
      this.doc(id).set(value, setOptions);
      return of(id);
    }

    // TODO: Ignore those adapter options for the sake of test.
    // if (this.options && this.options.timeoutWriteOperations) {
    //   return from(this.doc(id).set(value, setOptions)).pipe(
    //     timeoutWith(this.options.timeoutWriteOperations, of(id)),
    //     mapTo(id)
    //   );
    // } else {
    //   return from(this.doc(id).set(value, setOptions)).pipe(mapTo(id));
    // }
    return from(this.doc(id).set(value, setOptions)).pipe(mapTo(id));
  }

  // TODO: Try with the converter option.
  private docRef(id: string): DocumentReference<T> {
    return this.afs.collection<T>(this.basePath).doc(id).ref;
    // return this.afs.collection(this.basePath).doc(id).ref.withConverter(this.converter);
  }

  // TODO: Use ng-web-apis
  private isOffline() {
    return navigator.onLine !== undefined && !navigator.onLine;
  }
}
