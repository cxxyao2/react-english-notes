import { db } from '../firebase'
import {
  collection,
  deleteDoc,
  query,
  where,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs
} from 'firebase/firestore'
import { Note } from 'models/note'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export const addNote = async (note: Note) => {
  const keywordArray = note.keyword.split(' ')

  return await addDoc(collection(db, 'notes'), {
    ...note,
    keyword: keywordArray
  })
  //   console.log('Document written with ID: ', docRef.id)
}

export const getOneNote = async (id: string): Promise<Note | null> => {
  const docRef = doc(db, 'notes', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data()
    return {
      id,
      language: docData.language,
      category: docData.category,
      keyword: docData.keyword.join(' '),
      created: new Date(docData.created.toDate()),
      content: docData.content,
      industry: docData.industry,
      mastered: docData.mastered || false,
      hitCounter: docData.hitCounter
    }
  } else {
    return null
  }
}

// get all documents in a collection
export const getAllNotes = async () => {
  const querySnapshot = await getDocs(collection(db, 'notes'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
}

export const deleteOneNote = async (id: string) => {
  console.log('deleting id is', id)
  return await deleteDoc(doc(db, 'notes', id))
}

export const updateNote = async (newNote: Note) => {
  console.log('hi,uppdateNOte', newNote)
  return await setDoc(doc(db, 'notes', newNote.id || ''), newNote)
}

export const queryNotes = async () => {
  const q = query(collection(db, 'notes'), where('keyword', '!=', null))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
}
