import MDEditor from '@uiw/react-md-editor'
import { useEffect, useRef, useState } from 'react'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addNote } from 'services/notes-service'
import { Note } from 'models/note'
import { useNavigate } from 'react-router-dom'
import { getMessageOfError } from 'utils'

export default function MarkdownEditor() {
  const btnSubmitRef = useRef(null)
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    language: Yup.string().required('language is required'),
    keyword: Yup.string().required('Keyword is required'),
    category: Yup.string().required('Category is required'),
    industry: Yup.string().required('Industry is required')
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const [content, setContent] = useState<string | undefined>('')
  const [createDate, setCreateDate] = useState(new Date())
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // add accessibility to  Markdown Editor
  useEffect(() => {
    const editErea = document.querySelector('textarea')
    const keyupEvent = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        btnSubmitRef.current &&
          (btnSubmitRef.current as HTMLButtonElement).focus()
      }
      console.log('key up', event.key)
    }
    editErea?.addEventListener('keyup', keyupEvent)

    return () => {
      editErea?.removeEventListener('keyup', keyupEvent)
    }
  }, [])

  const onSubmit = (data: any) => {
    setErrorMessage(null)
    if (errors && Object.entries(errors).length > 0) return
    if (!content || !createDate) return
    const note1: Note = {
      language: data.language,
      category: data.category,
      keyword: data.keyword,
      industry: data.industry,
      date: createDate,
      content: content || '',
      mastered: false
    }

    addNote(note1)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        let message = getMessageOfError(error)
        setErrorMessage(message)
      })
  }

  return (
    <div className='border-2 border-info p-2 shadow w-75 mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='d-flex flex-column'>
          <div className='mb-2'>
            <select
              id='language'
              className='form-select'
              {...register('language')}
              name='language'
              defaultValue={'en'}>
              <option value='en'>English</option>
              <option value='fr'>French</option>
            </select>
          </div>
          <div className='mb-2'>
            <select
              id='category'
              {...register('category')}
              className='form-select'
              name='category'
              defaultValue={'topic'}>
              <option value='word'>A Single Word</option>
              <option value='topic'>A Topic</option>
            </select>
          </div>
          <div className='mb-2'>
            <select
              id='industry'
              {...register('industry')}
              className='form-select'
              defaultValue={'culture'}
              name='industry'>
              <option value='finance'>finance</option>
              <option value='IT'>IT</option>
              <option value='weather'>weather</option>
              <option value='culture'>culture</option>
              <option value='sports'>sports</option>
              <option value='health'>health</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='keyword' className='form-label'>
              Keyword
            </label>
            <input
              type='text'
              {...register('keyword')}
              className='form-control'
              id='keyword'
              placeholder='enter keyword'
            />
          </div>

          <div className='w-100'>
            <div className='d-inline-flex'>Create Date: &nbsp;</div>
            {/* <DatePicker
              name='createDate'
              onChange={setCreateDate}
              value={createDate}
            /> */}
          </div>
          <br className='border-t-2  border-info' />
          <MDEditor value={content} onChange={setContent} />
          {/* <MDEditor.Markdown
            source={content}
            style={{ whiteSpace: 'pre-wrap' }}
          /> */}
          <br className='border-t-2  border-info' />
          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <div className='w-100 mt-2'>
            <button
              ref={btnSubmitRef}
              type='submit'
              className='btn btn-primary'>
              Submit
            </button>
            <button
              className='mx-2 btn btn-secondary'
              onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
