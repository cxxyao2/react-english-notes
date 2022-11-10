import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from 'react'

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  DocumentData,
  Query
} from 'firebase/firestore'
import { db } from '../firebase'
import { Note } from 'models/note'

interface SearchContextType {
  searchKey: string | null
  results: Array<Note> | null
  setSearchKey: React.Dispatch<React.SetStateAction<string | null>>
  setResults: React.Dispatch<React.SetStateAction<Note[] | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface SearchContextProviderProps {
  children: ReactNode
}

export const SearchContext = createContext<SearchContextType>({
  searchKey: null,
  results: null,
  setSearchKey: (value: any) => {},
  setResults: (value: any) => {},
  isLoading: false,
  setIsLoading: (value: any) => {}
})

export function useSearch() {
  return useContext(SearchContext)
}

export function SearchContextProvider({
  children
}: SearchContextProviderProps) {
  const [searchKey, setSearchKey] = useState<string | null>(null)
  const [results, setResults] = useState<Array<Note> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getDataBySearchKey = async (criteria: string) => {
    const foundNotes: Array<Note> = []
    let q: Query<DocumentData>

    if (criteria) {
      q = query(
        collection(db, 'notes'),
        where('keyword', 'array-contains', criteria)
      )
    } else {
      let today = new Date()
      let firstDayOfLostMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        1
      )
      q = query(
        collection(db, 'notes'),
        where('date', '>=', firstDayOfLostMonth)
      )
    }

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      foundNotes.push({
        id: doc.id,
        language: docData.language,
        category: docData.category,
        keyword: docData.keyword.join(' '),
        date: new Date(docData.date.toDate()),
        content: docData.content,
        industry: docData.industry,
        mastered: docData.mastered || false
      })
    })

    foundNotes.sort((a, b) => (a.date > b.date ? -1 : 1))
    setResults(foundNotes)
  }

  useEffect(() => {
    // get data from firestore
    // no wildcard can be used in firestore query
    // first, get key array

    // second, locate keyId from key array
    setIsLoading(true)
    try {
      getDataBySearchKey(searchKey || '')
    } finally {
      setIsLoading(false)
    }
  }, [searchKey])

  const value = {
    searchKey,
    setSearchKey,
    results,
    setResults,
    isLoading,
    setIsLoading
  }
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
