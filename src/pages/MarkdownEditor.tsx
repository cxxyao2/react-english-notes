import MDEditor from '@uiw/react-md-editor'
import { useEffect, useRef, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addNote } from 'services/notes-service'
import { Note } from 'models/note'
import { useNavigate } from 'react-router-dom'
import { getMessageOfError } from 'utils'
import { useSearch } from 'contexts/SearchContext'
import { updateStats } from 'services/stats-service'

const MarkdownEditor = () => {
  const btnSubmitRef = useRef(null)
  const inputDateRef = useRef<HTMLInputElement>(null)
  const inputTimeRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    language: Yup.string().required('language is required'),
    keyword: Yup.string().required('Keyword is required'),
    category: Yup.string().required('Category is required'),
    industry: Yup.string().required('Industry is required')
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState
  const [content, setContent] = useState<string | undefined>('Hello world')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    sectionCardData,
    sectionTopicData,
    sectionNavbarData,
    setFreshCounter
  } = useSearch()

  // add accessibility to  Markdown Editor
  useEffect(() => {
    const editErea = document.querySelector('textarea')
    const today = new Date()
    const year = today.getFullYear().toString()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    if (inputDateRef && inputDateRef.current) {
      inputDateRef.current.value = year + '-' + month + '-' + day
    }

    if (inputTimeRef && inputTimeRef.current) {
      inputTimeRef.current.value = '01:01'
    }

    const keyupEvent = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        btnSubmitRef.current &&
          (btnSubmitRef.current as HTMLButtonElement).focus()
      }
    }
    editErea?.addEventListener('keyup', keyupEvent)

    return () => {
      editErea?.removeEventListener('keyup', keyupEvent)
    }
  }, [])

  const updateSectionTopic = (id: string, newNote: Note) => {
    const sorted = [...sectionTopicData]
    sorted.sort((a, b) => a.created.getTime() - b.created.getTime())

    if (sorted && sorted[0].id) {
      const newTopic = { ...newNote, initId: id }
      updateStats(sorted[0].id, newTopic).then(() => {
        setFreshCounter((pre) => pre + 1)
        navigate('/')
      })
    }
  }

  const updateSectionWord = (id: string, newNote: Note) => {
    const stat = sectionNavbarData.find((ele) => ele.name === newNote.industry)
    if (stat) {
      let newStat = {
        unmastered: stat.unmastered > 0 ? stat.unmastered + 1 : 1
      }

      const nullCard = sectionCardData.find((ele) => !ele.initId)
      const p1 = updateStats(stat.id!, newStat)
      let p2: Promise<void> = Promise.resolve()
      if (nullCard) {
        p2 = updateStats(nullCard.id!, {
          ...newNote,
          initId: id
        })
      }

      Promise.all([p1, p2]).then(() => {
        setFreshCounter((pre) => pre + 1)
        navigate('/')
      })
    }
  }

  const onSubmit = (data: any) => {
    if (errors && Object.entries(errors).length > 0) return

    setErrorMessage(null)
    const dateString = inputDateRef.current?.value
    const timeString = inputTimeRef.current?.value
    let datetimeString = dateString?.concat(' ', timeString ?? '') || ''
    if (isNaN(Date.parse(datetimeString))) {
      setErrorMessage('Date or time is invalid.')
      return
    }
    const newCreated: Date = new Date(Date.parse(datetimeString))

    if (!content) return
    const note1: Note = {
      language: data.language,
      category: data.category,
      keyword: data.keyword,
      industry: data.industry,
      created: newCreated,
      content: content || '',
      mastered: false,
      hitCounter: 1
    }

    addNote(note1)
      .then((result) => {
        const newId = result.id
        if (note1.category === 'topic') {
          updateSectionTopic(newId, note1)
        }
        if (note1.category === 'word') {
          updateSectionWord(newId, note1)
        }
      })
      .catch((error) => {
        let message = getMessageOfError(error)
        setErrorMessage(message)
      })
  }

  return (
    <div className='border-2 border-info p-2 shadow w-75 mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className='was-validated'>
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
              <option value='Finance'>Finance</option>
              <option value='IT'>IT</option>
              <option value='Weather'>Weather</option>
              <option value='Culture'>Culture</option>
              <option value='Sports'>Sports</option>
              <option value='Health'>Health</option>
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

          <div className='row'>
            <div className='col-md-6 mb-3'>
              <label htmlFor='createdDate'>Created Date: </label>
              <input
                className='form-control'
                ref={inputDateRef}
                id='createdDate'
                type='date'
                name='createdDate'
                required
                defaultValue={'2022-01-01'}
                pattern='\d{4}-\d{2}-\d{2}'
              />
              <div className='invalid-tooltip'>Please choose an valid date</div>
            </div>

            <div className='col-md-6 mb-3'>
              <label htmlFor='createdTime'>Created Time: </label>
              <input
                ref={inputTimeRef}
                id='createTime'
                className='form-control'
                type='time'
                name='createdTime'
                min='00:01'
                defaultValue={'01:01'}
                required></input>

              <div className='invalid-tooltip'>
                Please provide an valid time.
              </div>
            </div>
          </div>
          <br className='border-t-2  border-info' />
          <MDEditor
            value={content}
            onChange={setContent}
            preview={'edit'}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]]
            }}
          />

          <br className='border-t-2  border-info' />
          {errorMessage && (
            <div
              className='alert alert-danger'
              style={{ fontSize: '80%' }}
              role='alert'>
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

export default MarkdownEditor
