import SearchForm from '../components/SearchForm'
import SearchResult from 'components/SearchResult'
import { INIT_CARD_DATA } from '../constants'
import { useEffect, useState } from 'react'
import { Note } from 'models/note'
import { useAppSelector } from 'hooks'
import { selectAllNotes } from 'reducers/notesSlice'

export default function SearchPage() {
	const [currentFilters, setCurrentFilters] = useState<
		FormData | null | undefined
	>(null)
	const [results, setResults] = useState<Note[]>(INIT_CARD_DATA)
	const allNotes = useAppSelector(selectAllNotes)

	useEffect(() => {
		handleSearch(currentFilters, allNotes)
	}, [currentFilters, allNotes])

	const handleSearch = (
		newFilters: FormData | null | undefined,
		notes: Note[]
	) => {
		if (!newFilters) {
			return
		}
		const e: FormData = newFilters
		const keyword = e.get('keyword')?.toString() || ''
		const industry = e.get('industry')?.toString() || ''
		const showMastered = e.get('checkMastered')?.toString() || ''
		const showUnmastered = e.get('checkUnmastered')?.toString() || ''
		let masteredStatus = true
		const showBoth = showMastered === showUnmastered
		if (!showBoth) {
			masteredStatus = showMastered === 'true'
		}

		let waitingFilter = [...notes]

		const filteredData = waitingFilter.filter(
			(ele) =>
				ele.keyword.toLowerCase().includes(keyword.toLowerCase()) ||
				ele.content.toLowerCase().includes(keyword.toLowerCase())
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
