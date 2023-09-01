import { TrashIcon } from '@heroicons/react/24/outline'
import MDEditor from '@uiw/react-md-editor'
import Paginator from 'components/paginator'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Note } from 'models/note'
import { useEffect, useState } from 'react'
import { deleteNote, fetchNotes, selectAllNotes } from 'reducers/notesSlice'
import { makeCSV } from 'utils/fileConvert'

// AboutPage is a wrong name.  This is the Archive page.

const ArchivePage = () => {
	const dispatch = useAppDispatch()
	const allNotes = useAppSelector(selectAllNotes)
	const [current, setCurrent] = useState(1)
	const [itemNumber, setItemNumber] = useState(5)

	const [selectedId, setSelectedId] = useState<string | undefined>('')
	const [selectedContent, setSelectedContent] = useState<string | undefined>('')

	const [displayedNotes, setDisplayedNotes] = useState<Note[]>([])

	const exportCSV = () =>
	{
		if (allNotes.length === 0) {
			return
		}
		// todo turn the result of query into 2 dimensional array
		// allNotes.map((note) => {
		const data = allNotes.map((note) => Object.values(note))
		makeCSV(data, 'notes.csv')
	}

	const handlePageChanged = (
		currentPage: number,
		itemNumberPerPage: number
	) => {
		setCurrent(() => currentPage)
		setItemNumber(() => itemNumberPerPage)
	}

	const setSelect = (note: Note) => {
		if (!note) return
		setSelectedId(note.id)
		setSelectedContent(note.content)
	}

	useEffect(() => {
		if (allNotes.length === 0) {
			dispatch(fetchNotes())
		}
	}, [])

	useEffect(() => {
		setDisplayedNotes(
			allNotes.slice((current - 1) * itemNumber, current * itemNumber)
		)
		setSelect(allNotes[(current - 1) * itemNumber])
	}, [current, itemNumber, allNotes])

	return (
		<div className='container bg-white mt-3 rounded'>
			<div className='row fw-bold text-center my-2'>
				<div className='col-12'>Archive</div>
			</div>

			<div className='row text-left'>
				<div className='col-4 d-flex flex-column '>
					<Paginator
						itemCount={allNotes?.length}
						pageChanged={(currentPage, itemNumberPerPage) =>
							handlePageChanged(currentPage, itemNumberPerPage)
						}
						className='mt-2'></Paginator>
					<button className='btn btn-primary my-2' onClick={exportCSV}>
						Export Notes To CSV
					</button>
					<hr></hr>
					<ul>
						{' '}
						{displayedNotes.map((note) => (
							<li key={note.id} onClick={() => setSelect(note)}>
								<div style={{ fontSize: '0.8125rem' }}>
									{new Date(note.created || Date.now()).toLocaleDateString()}
								</div>
								<div className='fw-bold'>{note.keyword}</div>
								<hr></hr>
							</li>
						))}
					</ul>
				</div>
				<div className='col-8 p-4 bg-info d-flex flex-column justify-content-start align-items-center '>
					<div className='bg-info h-25'>
						<button
							aria-label='Delete'
							onClick={() => {
								if (!selectedId) {
									return
								}
								if (
									window.confirm('Are you sure to delete the record?') !== true
								) {
									return
								}
								dispatch(deleteNote(selectedId))
							}}
							className=' rounded-2 px-2 py-1  bg-dark text-warning'>
							<TrashIcon style={{ width: '24px', height: '24px' }} />
						</button>
					</div>
					<MDEditor.Markdown
						source={selectedContent}
						className='p-2 col-10 rounded'
						style={{ whiteSpace: 'pre-wrap' }}
					/>
				</div>
			</div>
		</div>
	)
}
export default ArchivePage
