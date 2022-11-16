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
import { Stats } from 'models/stats'

import { initNavbarData, initCardData, initTopicData } from './../constants'

interface SearchContextType {
  searchKey: string | null
  results: Array<Note> | null
  setSearchKey: React.Dispatch<React.SetStateAction<string | null>>
  setResults: React.Dispatch<React.SetStateAction<Note[] | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  topError: string
  setTopError: React.Dispatch<React.SetStateAction<string>>
  sectionNavbarData: Stats[]
  sectionTopicData: Note[]
  sectionCardData: Note[]
  setSectionNavbarData: React.Dispatch<React.SetStateAction<Stats[]>>
  setSectionCardData: React.Dispatch<React.SetStateAction<Note[]>>
  setSectionTopicData: React.Dispatch<React.SetStateAction<Note[]>>
  freshCounter:number
  setFreshCounter: React.Dispatch<React.SetStateAction<number>>


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
  setIsLoading: (value: any) => {},
  topError: '',
  setTopError: (value: any) => {},
  sectionNavbarData: [],
  setSectionNavbarData: (value: any) => {},
  sectionCardData: [],
  setSectionCardData: (value: any) => {},
  sectionTopicData: [],
  setSectionTopicData: (value: any) => {},
  freshCounter:0,
  setFreshCounter:(value:any)=>{}
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
  const [topError, setTopError] = useState<string>('')
  const [sectionNavbarData, setSectionNavbarData] = useState(initNavbarData)
  const [sectionCardData, setSectionCardData] = useState(initCardData)
  const [sectionTopicData, setSectionTopicData] = useState(initTopicData)
  const [freshCounter, setFreshCounter] = useState(0)

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
        keyword: docData.keyword,
        created: new Date(docData.created.toDate()),
        content: docData.content,
        industry: docData.industry,
        mastered: docData.mastered || false,
        hitCounter: docData.hitCounter
      })
    })

    foundNotes.sort((a, b) => (a.created > b.created ? -1 : 1))
    setResults(foundNotes)
  }

  useEffect(() => {
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
    setIsLoading,
    topError,
    setTopError,
    sectionCardData,
    setSectionCardData,
    sectionTopicData,
    setSectionTopicData,
    sectionNavbarData,
    setSectionNavbarData,
    freshCounter,
    setFreshCounter
  }
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
