import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  writeBatch,
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

    return querySnapShot;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(userId: string, productId: string) {
  try {
    const refs = collection(db, "cart", userId, "productsCollection");
    const q = query(refs, where("id", "==", productId));
    const results = await getDocs(q);
    const docRef = results.docs[0].ref;
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductsCart(userId: string) {
  try {
    const batch = writeBatch(db);

    const refs = collection(db, "cart", userId, "productsCollection");
    const results = await getDocs(refs);

    //esto es una forma de hacerlo
    // const array = results.docs;
    // for (const product of array) {
    //   await deleteDoc(product.ref);
    // }

    //esta es otra
    results.forEach((product) => {
      batch.delete(product.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
}
