import topicImg from './SectionTopicIT.jpg'
import './SectionHero.css'
import { initCardData } from '../constants'
import { useEffect, useState } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { useNavigate } from 'react-router-dom'
import { Note } from 'models/note'
import { updateStats } from '../services/stats-service'
import { getFirstUnknownNote, updateNote } from 'services/notes-service'

const SectionHero = () => {
  const navigate = useNavigate()
  const {
    sectionCardData: stats,
    sectionNavbarData,
    setFreshCounter
  } = useSearch()
  const [data, setData] = useState(initCardData)
  useEffect(() => {
    if (stats && stats.length > 0) {
      setData(stats.slice(0, 3))
    }
  }, [stats])

  const onDismiss = async (currentNote: Note) => {
    // 1, update Note table
    await updateNote(currentNote.initId!, { mastered: true })

    // 2, update Statistics table: mastered field
    const stat = sectionNavbarData.find(
      (ele) => ele.name === currentNote.industry
    )
    if (stat) {
      let newStat = {
        unmastered: stat.unmastered - 1 > 0 ? stat.unmastered - 1 : 0,
        mastered: stat.mastered + 1
      }
      await updateStats(stat.id!, newStat)
    }

    // 3, update statistics table: replace a card
    const currentCards = [...data]
    const id = currentNote.id
    const newCard = await getFirstUnknownNote(currentCards)
    if (newCard)
      updateStats(id!, {
        ...newCard,
        initId: newCard!.id
      }).then(() => {
        setFreshCounter((pre) => pre + 1)
      })
    updateStats(id!, { initId: '', keyword: '' }).then(() => {
      setFreshCounter((pre) => pre + 1)
    })
  }

  return (
    <div className='ds-card-grid'>
      {data.map((ele) => (
        <div key={ele.id} className='ds-card'>
          <div className='img-wrapper'>
            <img loading='lazy' src={topicImg} alt="word image" />
          </div>
          <div className='mt-1 mb-2 p-1'>
            <div className='' style={{ fontSize: '12px' }}>
              {ele.initId
                ? ele.created.toDateString()
                : new Date().toDateString()}{' '}
            </div>
            <div style={{ maxWidth: '200px', overflowWrap: 'break-word' }}>
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
                if (ele.initId)
                  onDismiss(ele).then(() => setFreshCounter((pre) => pre + 1))
              }}>
              Dismiss
            </button>
            <button
              className={'btn btn-sm btn-primary'}
              onClick={() => {
                if (ele.initId) navigate(`/display/${ele.initId}`)
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
