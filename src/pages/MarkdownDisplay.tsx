import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getOneNote, updateNote } from 'services/notes-service'
import { Note } from 'models/note'
import { Link, useParams } from 'react-router-dom'
import rehypeSanitize from 'rehype-sanitize'

export default function MarkdownDisplay() {
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [isEditable, setIsEditable] = useState(false)
  const navigate = useNavigate()
  const [content, setContent] = useState<string | undefined>('')

  useEffect(() => {
    if (id) {
      getOneNote(id)
        .then((data) => {
          if (data) {
            const currentData = data as Note
            setNote(currentData)
            setContent(currentData.content)
          }
        })
        .catch((err) => {
          console.group('error is', err)
        })
    }
  }, [id])

  const updateContent = () => {
    note && updateNote({ ...note, content: content ?? '' }).then()
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
          <label className='form-label  fw-semibold'>Date:</label>
          <div className='form-label'>{note?.created.toLocaleString()}</div>
        </div>
        <br className='border-t-2  border-info' />

        <div className='mb-1 border-bottom border-bottom-info'>
          <label className='form-label  fw-semibold'>Note Content</label>
          {!isEditable && (
            <MDEditor.Markdown
              source={note?.content}
              className="p-2 rounded"
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
            className='btn btn-primary'
            onClick={() => navigate('/')}>Back</button>
          <button className='btn btn-outline-secondary'
            onClick={() => {
              if (!isEditable) {
                setIsEditable(true)
                return
              }
              updateContent()
            }}>
            {isEditable ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  )
}
