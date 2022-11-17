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
    const p1 = updateNote(currentNote.initId!, { mastered: true })

    // 2, update Statistics table: mastered + 1
    const stat = sectionNavbarData.find(
      (ele) => ele.name === currentNote.industry
    )
    let p2: Promise<void> = Promise.resolve()

    if (stat) {
      let newStat = {
        unmastered: stat.unmastered - 1 > 0 ? stat.unmastered - 1 : 0,
        mastered: stat.mastered + 1
      }
      p2 = updateStats(stat.id!, newStat)
    }

    // 3, update statistics table: replace a card
    const currentCards = [...data].filter(ele=> ele.id!==currentNote.id)
    const id = currentNote.id
    const p3 = getFirstUnknownNote(currentCards)
    Promise.all([p1, p2, p3]).then((result) => {
      let p4 = updateStats(id!, { initId: '', keyword: '' })
      if (result[2]) {
        p4 = updateStats(id!, {
          ...result[2],
          initId: result[2]!.id
        })
      }
      p4.then(() => {
        setFreshCounter((pre) => pre + 1)
      }).catch((err) => {
        console.log('dismiss error is', err)
      })
    })
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
                ? ele.created.toDateString()
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
