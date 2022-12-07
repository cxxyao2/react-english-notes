import { DocumentData } from 'firebase/firestore'
import { Note } from 'models/note'

export const getNoteFromDocument = (
  doc: DocumentData,
  id: string,
  initId?: string
): Note => {
  return {
    language: doc.language || 'en',
    category: 'word',
    keyword: doc.keyword,
    created: (doc.created.toDate() as Date).getTime() || new Date().getTime(),
    content: doc.content,
    industry: doc.industry || 'IT',
    mastered: doc.mastered || false,
    hitCounter: doc.hitCounter || 1,
    initId: initId || doc.initId,
    id: id
  }
}
