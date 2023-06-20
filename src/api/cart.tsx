import { db } from "@/app/firebase";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
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
