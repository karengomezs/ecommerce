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
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductsCart(userId: string) {
  try {
    const refs = collection(db, "cart", userId, "productsCollection");
    const results = await getDocs(refs);
    const array = results.docs;
    for (const product of array) {
      await deleteDoc(product.ref);
    }
  } catch (error) {
    console.error(error);
  }
}
