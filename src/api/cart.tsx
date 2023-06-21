import { db } from "@/app/firebase";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function saveToCart(id: string, product: Product) {
  try {
    const docRef = await addDoc(
      collection(db, "cart", id, "productsCollection"),
      product
    );
    return docRef;
  } catch (error) {
    console.error(error);
  }
}

export async function getproducts(id: string) {
  try {
    const productRef = collection(db, "cart", id, "productsCollection");
    const querySnapShot = await getDocs(productRef);
    console.log(querySnapShot);
    return querySnapShot;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(userId: string, productId: string) {
  try {
    const refs = collection(db, "cart", userId, "productsCollection");
    const q = query(refs, where("id", "==", productId));
    const results = await getDocs(q);
    const docRef = results.docs[0].ref;
    await deleteDoc(docRef);
    //const delete = await deleteDoc(doc(db, ));
    // console.log({ results: results.docs[0].ref }, results.docs[0].data());
  } catch (error) {
    console.error(error);
  }
}

// // Create a reference to the cities collection
// import { collection, query, where } from "firebase/firestore";
// const citiesRef = collection(db, "cities");

// // Create a query against the collection.
// const q = query(citiesRef, where("state", "==", "CA"));
