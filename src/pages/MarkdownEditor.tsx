import MDEditor from '@uiw/react-md-editor'
import { useEffect, useRef, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Note } from 'models/note'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'hooks'
import { addNote } from 'reducers/notesSlice'
import { topicsSelector } from 'reducers/topicsSlice'
import { selectAllCards, updateCard } from 'reducers/cardsSlice'
import { updateTopic } from './../reducers/topicsSlice'
import { selectAllStats, updateStat } from 'reducers/statsSlice'

const MarkdownEditor = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const allTopics = useAppSelector(topicsSelector)
  const allCards = useAppSelector(selectAllCards)
  const allStats = useAppSelector(selectAllStats)

  const btnSubmitRef = useRef(null)
  const inputDateRef = useRef<HTMLInputElement>(null)
  const inputTimeRef = useRef<HTMLInputElement>(null)
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

  const updateSectionTopic = (newNote: Note) => {
    const sorted = [...allTopics]
    sorted.sort((a, b) => (a.created > b.created ? -1 : 1))

    if (sorted && sorted[0].id) {
      const newTopic = { ...newNote, initId: newNote.id, id: sorted[0].id }
      dispatch(updateTopic(newTopic))
    }
    navigate('/')
  }

  const updateSectionCard = (newNote: Note) => {
    // 1, update stats table: unmastered + 1
    const stat = allStats.find((ele) => ele.name === newNote.industry)
    if (stat) {
      let unmastered = stat.unmastered + 1
      const needUpdateField = { unmastered }
      dispatch(updateStat({ ...stat, ...needUpdateField }))
    }

    // 2, update cards table: replace a blank card
    const blankCard = allCards.find((ele) => !ele.initId)
    if (blankCard) {
      dispatch(
        updateCard({
          ...newNote,
          id: blankCard.id,
          initId: newNote.id
        })
      )
    }
    navigate('/')
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
      created: newCreated.getTime(),
      content: content || '',
      mastered: false,
      hitCounter: 1
    }

    dispatch(addNote(note1)).then((result) => {
      const returnedNote = result.payload as Note
      note1.id = returnedNote.id

      if (note1.category === 'topic') {
        updateSectionTopic(note1)
      }
      if (note1.category === 'word') {
        updateSectionCard(note1)
      }
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
              <input aria-label='input time'
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
