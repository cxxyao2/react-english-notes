import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Note } from 'models/note'
import { useParams } from 'react-router-dom'
import rehypeSanitize from 'rehype-sanitize'
import { EyeIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from 'hooks'
import { selectNoteById, updateNote } from './../reducers/notesSlice'

export default function MarkdownDisplay() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentNote = useAppSelector((state) => selectNoteById(state, id!))

  const [note, setNote] = useState<Note | null | undefined>(null)
  const [isEditable, setIsEditable] = useState(false)
  const [content, setContent] = useState<string | undefined>('')

  useEffect(() => {
    if (id) {
      setNote(currentNote)
      setContent(currentNote?.content)
      if (currentNote) {
        const hitCounter = currentNote?.hitCounter
          ? currentNote?.hitCounter + 1
          : 1
        dispatch(updateNote({ id: currentNote.id, hitCounter }))
      }
    }
  }, [id])

  const updateContent = () => {
    note && dispatch(updateNote({ id: note.id, content }))
    navigate('/')
  }

  return (
    <div className='border-2 border-info p-2 shadow w-75 mx-auto'>
      <div className='d-flex flex-column'>
        <div>
          <label className='form-label fw-semibold'>language</label>
          <select
            id='language'
            className='form-select'
            defaultValue={note?.language}
            name='language'>
            <option value='en'>English</option>
            <option value='fr'>French</option>
          </select>
        </div>
        <div>
          <label className='form-label fw-semibold mt-2'>category</label>
          <div className='form-label'>{note?.category}</div>
        </div>
        <div>
          <label className='form-label fw-semibold mt-2'>industry</label>
          <div className='form-label'>{note?.industry}</div>
        </div>
        <div className='mb-1'>
          <label className='form-label fw-semibold mt-2'>Keyword</label>
          <div className='form-label'>{note?.keyword}</div>
        </div>

        <div className='mb-1'>
          <label className='form-label  fw-semibold'>Created:</label>
          <div className='form-label'>
            {note && new Date(note.created).toLocaleString()}
          </div>
        </div>
        <br className='border-t-2  border-info' />

        <div className='mb-1 border-bottom border-bottom-info'>
          <label className='form-label  fw-semibold'>
            Note Content{' '}
            <EyeIcon
              width={24}
              height={24}
              className='text-muted  rounded ms-4 me-1'></EyeIcon>{' '}
            <span className='text-muted'>{note?.hitCounter || 1}</span>
          </label>
          {!isEditable && (
            <MDEditor.Markdown
              source={note?.content}
              className='p-2 rounded'
              style={{ whiteSpace: 'pre-wrap' }}
            />
          )}
          {isEditable && (
            <MDEditor
              value={content}
              onChange={setContent}
              preview={'edit'}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]]
              }}
            />
          )}
        </div>

        <br className='border-t-2  border-info' />
        <div className='d-flex justify-content-between '>
          <button
            className='btn btn-outline-secondary'
            onClick={() => {
              if (!isEditable) {
                setIsEditable(true)
                return
              }
              updateContent()
            }}>
            {isEditable ? 'Save' : 'Edit'}
          </button>
          <button className='btn btn-primary' onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
