// import { db } from '../firebase';

// console.log(db)

// async function readAllUsers(){
//   try{
//     const collectionRef = db.collection("users");
//     const getPromise = collectionRef.get();
//     const snapshot = await getPromise;
//     console.log(`Found ${snapshot.size}x user`);
//     const docs = snapshot.docs;
//     docs.forEach(user => {
//       console.log(user.id, user.data())
//     })
//   }catch(err){
//     console.error(err)
//   }
// }

// readAllUsers();