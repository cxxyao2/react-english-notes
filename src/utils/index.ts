import { DocumentData } from 'firebase/firestore'
import { Note } from 'models/note'

export function getMessageOfError(error: unknown) {
  let errorMessage = 'Error From Server'
  const errorProps = Object.getOwnPropertyNames(error)

  if (errorProps.includes('message')) {
    errorMessage += ' : ' + (error as any).message
  }
  return errorMessage
}

export function downloadJson() {
  let data = JSON.stringify({ weather: { is_sunny: true, temperature: 23 } })
  let dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(data)
  let exportFileName = 'weather.json'
  let linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileName)
  linkElement.click()
}

export const getNoteFromDocument = (
  doc: DocumentData,
  id: string,
  initId?: string
): Note => {
  const keyword = Array.isArray(doc.keyword)
    ? doc.keyword.join(' ')
    : doc.keyword

  // created: (doc.created.toDate() as Date).getTime() || new Date().getTime(),
  return {
    language: doc.language || 'en',
    category: 'word',
    keyword: keyword,
    created: new Date().getTime(),
    content: doc.content,
    industry: doc.industry || 'IT',
    mastered: doc.mastered || false,
    hitCounter: doc.hitCounter || 1,
    initId: initId || doc.initId,
    id: id
  }
}
