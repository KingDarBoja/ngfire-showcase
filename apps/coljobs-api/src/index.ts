/**
 * Main Firebase File to initialize, config and export the cloud functions
 * across the project.
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access Cloud Firestore.
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// Set up extra settings. Since May 29, 2020, Firebase Firebase Added support for
// calling FirebaseFiresore.settings with { ignoreUndefinedProperties: true }.
// When this parameter is set, Cloud Firestore ignores undefined properties
// inside objects rather than rejecting the API call.
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export * as company from './company';
export * as jobPost from './job-post';
