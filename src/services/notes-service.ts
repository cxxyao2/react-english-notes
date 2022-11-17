import { db } from '../firebase'
import {
  collection,
  deleteDoc,
  query,
  where,
  doc,
  addDoc,
  getDoc,
  getDocs,
  DocumentData,
  updateDoc
} from 'firebase/firestore'
import { Note } from 'models/note'

export const addNote = async (note: Note) => {
  const keywordArray = note.keyword.split(' ')

  return await addDoc(collection(db, 'notes'), {
    ...note,
    keyword: keywordArray
  })
}

export const getFirstUnknownNote = async (
  current: Note[]
): Promise<Note | null> => {
  const q = query(
    collection(db, 'notes'),
    where('mastered', '==', false),
    where('category', '==', 'word')
  )
  const docSnamp = await getDocs(q)
  let allUnmaster: { id: string; data: DocumentData }[] = []
  docSnamp.forEach((doc) => allUnmaster.push({ id: doc.id, data: doc.data() }))

  const idArray: string[] = []
  current.forEach((ele) => idArray.push(ele.id!))
  const firstNote = allUnmaster.find((ele) => !idArray.includes(ele.id))

  if (firstNote) return getNoteFromDocument(firstNote.data, firstNote.id)

  return null
}

export const getNoteFromDocument = (doc: DocumentData, id: string): Note => {
  return {
    language: doc.language || 'en',
    category: 'word',
    keyword: doc.keyword,
    created: doc.created.toDate(),
    content: doc.content,
    industry: doc.industry || 'IT',
    mastered: doc.mastered || false,
    hitCounter: doc.hitCounter || 1,
    initId: id,
    id: id
  }
}
export const getOneNote = async (id: string): Promise<Note | null> => {
  const docRef = doc(db, 'notes', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data()
    return getNoteFromDocument(docData, id)
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
  return await deleteDoc(doc(db, 'notes', id))
}

export const updateNote = async (id: string, newNote: Partial<Note>) => {
  const docRef = doc(db, 'notes', id)
  return await updateDoc(docRef, newNote)
}

export const queryNotes = async () => {
  const q = query(collection(db, 'notes'), where('keyword', '!=', null))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
  })
}
