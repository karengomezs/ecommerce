// import { db } from "@/app/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   query,
//   orderBy,
// } from "firebase/firestore";

// export async function savePost(post: Omit<Post, "id">) {
//   try {
//     const docRef = await addDoc(collection(db, "posts"), post);
//     return docRef;
//   } catch (error) {
//     console.error(error);
//   }
// }

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
