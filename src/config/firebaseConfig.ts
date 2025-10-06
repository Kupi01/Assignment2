// Jest mock exports for tests
// These will be overridden by jest.mock in test setup
export const firestore = jest ? jest.fn() : undefined;
export const auth = jest ? jest.fn() : undefined;
export const app = jest ? jest.fn() : undefined;
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import * as serviceAccount from "../../test-bb941-firebase-adminsdk-fbsvc-99d83178ed.json";

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

export { db };