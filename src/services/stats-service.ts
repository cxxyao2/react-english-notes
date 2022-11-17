import { db } from '../firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Stats } from 'models/stats'
import { Note } from 'models/note'

export const updateStats = async (
  id: string,
  newStat: Partial<Stats | Note>
) => {
  const docRef = doc(db, 'stats', id)
  return await updateDoc(docRef, newStat)
}

// get all documents in a collection
export const getAllStats = async () => {
  return await getDocs(collection(db, 'stats'))
}
