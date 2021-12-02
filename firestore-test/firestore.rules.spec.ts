// import {
//   assertFails,
//   assertSucceeds,
//   initializeTestEnvironment,
//   RulesTestEnvironment,
// } from "@firebase/rules-unit-testing";

// const PROJECT_ID = 'YOUR-PROJECT-ID';
// const getFirestore = () =>
//   initializeTestApp({ projectId: PROJECT_ID }).firestore();

// describe('Firestore security rules', () => {
//   beforeEach(async () => {
//     await clearFirestoreData({ projectId: PROJECT_ID });
//   });
//   it('can not read from the messages collection', async () => {
//     const db = getFirestore();
//     const testDoc = db.collection('messages').doc('testDoc');
//     await assertFails(testDoc.get());
//   });
//   afterAll(async () => {
//     const cleanUpApps = apps().map((app) => app.delete());
//     await Promise.all(cleanUpApps);
//   });
// });