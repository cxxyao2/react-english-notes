import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { getOneNote } from 'services/notes-service'
import { Note } from 'models/note'
import { Link, useParams } from 'react-router-dom'

export default function MarkdownDisplay() {
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>(null)

  useEffect(() => {
    if (id) {
      getOneNote(id)
        .then((data) => {
          if (data) {
            const oldData = data as Note
            setNote(oldData)
          }
        })
        .catch((err) => {
          console.group('error is', err)
        })
    }
  }, [id])

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
          <div className='form-label'>{note?.date.toLocaleString()}</div>
        </div>
        <br className='border-t-2  border-info' />

        <div className='mb-1 border-bottom border-bottom-info'>
          <label className='form-label  fw-semibold'>Note Content</label>
          <MDEditor.Markdown
            source={note?.content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>

        <br className='border-t-2  border-info' />
        <div className='w-100 '>
          <Link to='/'>
            <a className='btn btn-primary'>Back</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
