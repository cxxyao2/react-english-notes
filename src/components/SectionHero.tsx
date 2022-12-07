import topicImg from './SectionTopicIT.jpg'
import './SectionHero.css'
import { initCardData } from '../constants'
import { useEffect, useState } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { useNavigate } from 'react-router-dom'
import { Note } from 'models/note'

import { useAppDispatch, useAppSelector } from 'hooks'
import { selectAllCards, fetchCards, updateCard } from 'reducers/cardsSlice'
import { selectAllStats, updateStat } from 'reducers/statsSlice'
import { updateNote } from 'reducers/notesSlice'

const SectionHero = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { setIsLoading, setTopError } = useSearch()

  const [data, setData] = useState<Note[]>(initCardData)
  const status = useAppSelector((state) => state.cards.status)

  const allStats = useAppSelector(selectAllStats)
  const allCards = useAppSelector(selectAllCards)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCards())
    }

    if (status === 'succeeded') {
      setData(allCards)
    }

    if (status === 'failed') {
      // setTopError()
    }
  }, [status, dispatch])

  const onDismiss = async (currentCard: Note) => {
    // 1, update notes table
    const p1 = dispatch(updateNote({ id: currentCard.initId!, mastered: true }))

    // 2, update stats table: mastered + 1, unmastered -1
    const stat = allStats.find((ele) => ele.name === currentCard.industry)
    let p2: Promise<any> = Promise.resolve()
    if (stat) {
      let newStat = {
        unmastered: stat.unmastered - 1 > 0 ? stat.unmastered - 1 : 0,
        mastered: stat.mastered + 1
      }
      p2 = dispatch(updateStat({ ...stat, ...newStat }))
    }

    // 3, update cards table: replace a card
    const unmasteredCard = allCards.find(
      (ele) => ele.id !== currentCard.id && ele.mastered === false
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
        updateCard({ id: currentCard.id!, initId: '', keyword: '' })
      )
    }

    Promise.all([p1, p2, p3]).then()
  }

  return (
    <div className='ds-card-grid'>
      {data.map((ele) => (
        <div key={ele.id} className='ds-card'>
          <div className='img-wrapper'>
            <img loading='lazy' src={topicImg} alt='word image' />
          </div>
          <div className='mt-1 mb-2 p-1'>
            <div className='' style={{ fontSize: '12px' }}>
              {ele.initId
                ? new Date(ele.created).toDateString()
                : new Date().toDateString()}{' '}
            </div>
            <div style={{ maxWidth: '200px' }} className='text-truncate'>
              {ele.initId
                ? Array.isArray(ele.keyword)
                  ? ele.keyword.join(' ')
                  : ele.keyword
                : 'No more word to review'}
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
