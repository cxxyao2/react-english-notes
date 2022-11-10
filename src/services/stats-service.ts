import { db } from '../firebase'
import {
  collection,
  getDocs
} from 'firebase/firestore'
import { Stats } from 'models/stats'



// export const getOneNote = async (id: string): Promise<Note | null> => {
//   const docRef = doc(db, 'notes', id)
//   const docSnap = await getDoc(docRef)

//   if (docSnap.exists()) {
//     const docData = docSnap.data()
//     return {
//       id,
//       language: docData.language,
//       category: docData.category,
//       keyword: docData.keyword.join(' '),
//       date: new Date(docData.date.toDate()),
//       content: docData.content,
//       industry: docData.industry,
//       mastered: docData.mastered || false
//     }
//   } else {
//     return null
//   }
// }

// get all documents in a collection
export const getAllStats = async () => {
  return await getDocs(collection(db, 'stats'))
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data())
  // })
}
