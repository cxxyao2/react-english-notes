import SearchForm from '../components/SearchForm'
import SearchResult from 'components/SearchResult'
import { INIT_CARD_DATA } from '../constants'
import { useEffect, useState } from 'react'
import { Note } from 'models/note'
import { useAppSelector, useAppDispatch } from 'hooks'
import { selectAllNotes, fetchNotes } from 'reducers/notesSlice'
import { useSearch } from 'contexts/SearchContext'

export default function SearchPage() {
  const { setIsLoading, setTopError } = useSearch()
  const [currentFilters, setCurrentFilters] = useState<
    FormData | null | undefined
  >(null)
  const [results, setResults] = useState<Note[]>(INIT_CARD_DATA)
  const allNotes = useAppSelector(selectAllNotes)
  const dispatch = useAppDispatch()
  const fetchError = useAppSelector((state) => state.notes.error)
  const fetchStatus = useAppSelector((state) => state.notes.status)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      setIsLoading(true)
      dispatch(fetchNotes())
    }
  })

  useEffect(() => {
    if (fetchError) {
      setTopError(fetchError)
    }
  }, [fetchError, setTopError])

  useEffect(() => {
    if (fetchStatus === 'failed' || fetchStatus === 'succeeded') {
      setIsLoading(false)
    }
  }, [fetchStatus])

  useEffect(() => {
    handleSearch()
  }, [currentFilters, allNotes])

  const handleSearch = () => {
    if (!currentFilters) {
      return
    }
    const e: FormData = currentFilters
    const keyword = e.get('keyword')?.toString() || ''
    const industry = e.get('industry')?.toString() || ''
    const showMastered = e.get('checkMastered')?.toString() || ''
    const showUnmastered = e.get('checkUnmastered')?.toString() || ''
    let masteredStatus = true
    const showBoth = showMastered === showUnmastered
    if (!showBoth) {
      masteredStatus = showMastered === 'true'
    }
    const filteredData = allNotes.filter((ele) =>
      showBoth
        ? ele.keyword.toLowerCase().includes(keyword.toLowerCase()) &&
          ele.industry.toLowerCase() === industry.toLowerCase()
        : ele.keyword.toLowerCase().includes(keyword.toLowerCase()) &&
          ele.industry.toLowerCase() === industry.toLowerCase() &&
          ele.mastered === masteredStatus
    )
    setResults(filteredData)
  }

  return (
    <div className='container my-2'>
      <div className='d-block'>
        <SearchForm triggerSearch={(e) => setCurrentFilters(() => e)} />
      </div>
      <div className='d-block'>{results.length} records found.</div>
      <SearchResult results={results} />
    </div>
  )
}
