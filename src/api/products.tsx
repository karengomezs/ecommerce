import { db, storage } from "@/app/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  DocumentReference,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File) {
  const fileRef = ref(storage, Date.now().toString() + "_" + file.name);

  const snapShot = await uploadBytes(fileRef, file);
  const urlImg = await getDownloadURL(fileRef);

  return { snapShot, urlImg };
}

export async function saveProduct({ id, ...product }: Product) {
  try {
    const docRef = await addDoc(collection(db, "product"), product);
    return docRef as DocumentReference<Product>;
  } catch (error) {
    console.error(error);
  }
}

export async function getproducts() {
  try {
    const productRef = collection(db, "product");
    const q = query(productRef, orderBy("date", "desc"));
    const querySnapShot = await getDocs(q);
    return querySnapShot;
  } catch (error) {
    console.error(error);
  }
}
