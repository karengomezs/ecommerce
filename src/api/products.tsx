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
  const urlImg = await getDownloadURL(snapShot.ref);

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

// export async function getPost() {
//   try {
//     const postRef = collection(db, "posts");
//     const q = query(postRef, orderBy("date", "desc"));
//     const querySnapShot = await getDocs(q);
//     return querySnapShot;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function deletePost(id: string) {
//   try {
//     return await deleteDoc(doc(db, "posts", id));
//   } catch (error) {
//     console.error(error);
//   }
// }
