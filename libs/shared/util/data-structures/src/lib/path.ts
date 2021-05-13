// Bounded recursion implemented by counting current depth using a tuple.
// We sacrifice one extra depth of recursion to acheieve this.
type StringableKey<T, L extends 0[] = []> = 1 extends T & 0
  ? never
  : 10 extends L['length']
  ? never
  : T extends readonly unknown[]
  ? number extends T['length']
    ? number
    : `${number}`
  : string | number;

/* eslint-disable @typescript-eslint/ban-types */
export type FlatBounded<T, L extends 0[] = []> = T extends object
  ? {
      [K in keyof T & StringableKey<T, L>]:
        | `${K}`
        | `${K}.${
            | FlatBounded<T[K], [...L, 0]>
            | (1 extends T[K] & 0 ? string | number : never)
            | (T[K] extends object
                ? 9 extends L['length']
                  ? string | number
                  : never
                : never)}`;
    }[keyof T & StringableKey<T, L>]
  : never;
/* eslint-enable @typescript-eslint/ban-types */
