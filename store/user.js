import { db } from './firebase';

console.log(db)

async function readAllUsers(){
  try{
    const collectionRef = db.collection("users");
    const getPromise = collectionRef.get();
    const snapshot = await getPromise;
    console.log(`Found ${snapshot.size}x user`);
    const docs = snapshot.docs;
    docs.forEach(docSnapshot => {
      console.log(docSnapshot.id, docSnapshot.data())
    })
  }catch(err){
    console.error(err)
  }
}

readAllUsers();