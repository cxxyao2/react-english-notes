
import topicImg from './SectionTopicIT.jpg'
import './SectionHero.css'
import { useNavigate } from 'react-router-dom'
import { Note } from 'models/note'
import { useAppDispatch, useAppSelector } from 'hooks'
import {
  fetchNotes,
  selectAllNotes,
  setSelectedId,
  updateNote
} from 'reducers/notesSlice'
import { selectAllStats, updateStat } from 'reducers/statsSlice'
import { selectAllCards, updateCard } from 'reducers/cardsSlice'

const SectionHero = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const allStats = useAppSelector(selectAllStats)
  const allCards = useAppSelector(selectAllCards)
  const allNotes = useAppSelector(selectAllNotes)

 

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
            <img src={topicImg} alt='word' />
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
                if (allNotes.length == 0) {
                  dispatch(fetchNotes()).then(() => {
                    if (ele.initId) onDismiss(ele)
                  })
                } else {
                  if (ele.initId) onDismiss(ele)
                }
              }}>
              Dismiss
            </button>
            <button
              className={'btn btn-sm btn-primary'}
              onClick={() => {
                if (ele.initId) {
                  dispatch(setSelectedId(ele.initId!))
                  navigate(`/edit/${ele.initId}`)
                }
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
