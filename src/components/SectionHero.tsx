import topicImg from './SectionTopicIT.jpg'
import './SectionHero.css'
import { INIT_CARD_DATA } from '../constants'
import { useEffect, useState } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { useNavigate } from 'react-router-dom'
import { Note } from 'models/note'

import { useAppDispatch, useAppSelector } from 'hooks'
import { selectAllCards, fetchCards, updateCard } from 'reducers/cardsSlice'
import { selectAllStats, updateStat } from 'reducers/statsSlice'
import { selectAllNotes, updateNote, fetchNotes } from 'reducers/notesSlice'

// TODO  是否需要单独init在这里,还是使用store 的值来初始化
const SectionHero = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { setIsLoading, setTopError } = useSearch()

  const cardsStatus = useAppSelector((state) => state.cards.status)
  const fetchError = useAppSelector((state) => state.cards.error)
  const notesStatus = useAppSelector((state) => state.notes.status)

  const allStats = useAppSelector(selectAllStats)
  const allCards = useAppSelector(selectAllCards)
  const allNotes = useAppSelector(selectAllNotes)

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [dispatch, fetchNotes, notesStatus])

  useEffect(() => {
    if (cardsStatus === 'idle') {
      setIsLoading(true)
      setTopError('')
      dispatch(fetchCards())
    }

    if (cardsStatus === 'failed') {
      setIsLoading(false)
      setTopError(fetchError || 'Unknown error')
    }
    if (cardsStatus === 'succeeded') {
      setIsLoading(false)
      setTopError('')
    }
  }, [cardsStatus, fetchCards, dispatch, fetchError, setIsLoading, setTopError])

  const onDismiss = async (currentCard: Note) => {
    // 1, update notes table
    const p1 = dispatch(updateNote({ id: currentCard.initId!, mastered: true }))

    // 2, update stats table: mastered + 1, unmastered -1
    const stat = allStats.find((ele) => ele.name === currentCard.industry)
    let p2: Promise<any> = Promise.resolve()
    if (stat) {
      let newStat = {
        unmastered: stat.unmastered ? stat.unmastered - 1 : 0,
        mastered: stat.mastered ?? 0 + 1
      }
      p2 = dispatch(updateStat({ ...stat, ...newStat }))
    }

    // 3, update cards table: replace a card, no duplicate
    const existIds: string[] = []
    allCards.forEach((ele) => existIds.push(ele.initId!))
    const unmasteredCard = allNotes.find(
      (ele) =>
        ele.id !== currentCard.id &&
        ele.mastered === false &&
        !existIds.includes(ele.id!)
    )
    let p3: Promise<any> = Promise.resolve()
    if (unmasteredCard) {
      p3 = dispatch(
        updateCard({
          ...unmasteredCard,
          id: currentCard.id!,
          initId: unmasteredCard.id
        })
      )
    } else {
      p3 = dispatch(
        updateCard({
          id: currentCard.id!,
          initId: '',
          keyword: 'No more word to learn',
          content: ''
        })
      )
    }

    Promise.all([p1, p2, p3]).then()
  }

  return (
    <div className='ds-card-grid'>
      {allCards.map((ele, index) => (
        <div key={index} className='ds-card'>
          <div className='img-wrapper'>
            <img loading='lazy' src={topicImg} alt='word' />
          </div>
          <div className='mt-1 mb-2 p-1'>
            <div className='' style={{ fontSize: '12px' }}>
              {ele.initId
                ? new Date(ele.created).toDateString()
                : new Date().toDateString()}{' '}
            </div>
            <div style={{ maxWidth: '200px' }} className='text-truncate'>
              {ele.keyword}
            </div>
          </div>
          <div className='d-flex p-1 justify-content-between my-2'>
            <button
              className='btn btn-sm btn-outline-secondary'
              onClick={() => {
                if (ele.initId) onDismiss(ele)
              }}>
              Dismiss
            </button>
            <button
              className={'btn btn-sm btn-primary'}
              onClick={() => {
                if (ele.initId) navigate(`/edit/${ele.initId}`)
              }}>
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SectionHero
