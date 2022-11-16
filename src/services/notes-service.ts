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
  getDocs,
  orderBy,
  limit,
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
  const q = query(collection(db, 'notes'), where('mastered', '==', false))
  const docSnamp = await getDocs(q)
  let firstNote: DocumentData | null = null
  let firstDate: Date | null = null
  let id = ''
  docSnamp.forEach((doc) => {
    if (!firstDate || (firstDate && doc.data().created.toDate() < firstDate)) {
      firstDate = doc.data().created.toDate()
      firstNote = doc.data()
      id = doc.id
      const found = current.find((cur) => cur.initId === id)
      if (found) {
        firstNote = null
      }
    }
  })
  if (firstNote) return getNoteFromDocument(firstNote, id)

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
  console.log('deleting id is', id)
  return await deleteDoc(doc(db, 'notes', id))
}

export const updateNote = async (id: string, newNote: Partial<Note>) => {
  console.log('hi,uppdateNOte', newNote)
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
