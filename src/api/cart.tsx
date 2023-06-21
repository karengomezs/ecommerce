import { db } from "@/app/firebase";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
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
