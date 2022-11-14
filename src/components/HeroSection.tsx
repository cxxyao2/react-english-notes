import topicImg from './SectionTopicIT.jpg'
import './HeroSection.css'
import { initCardData } from '../constants'
import { useEffect, useState } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(initCardData)
  const { sectionCardData: stats } = useSearch()
  useEffect(() => {
    if (stats && stats.length > 0) {
      setData(stats.slice(0, 3))
    }
  }, [stats])

  return (
    <div className='ds-card-grid'>
      {data.map((ele) => (
        <div key={ele.keyword} className='ds-card'>
          <div className='img-wrapper'>
            <img loading='lazy' src={topicImg} />
          </div>
          <div className='mt-1 mb-2 p-1'>
            <div className='' style={{ fontSize: '12px' }}>
              {ele.created.toDateString() +' 🔍  '+ ele.hitCounter.toString()}
            </div>
            <div style={{ maxWidth: '200px', overflowWrap: 'break-word' }}>
              {ele.keyword}
            </div>

          </div>
          <div className='d-flex p-1 justify-content-between my-2'>
            <button className='btn btn-sm btn-primary' onClick={()=>{navigate('/display/1ydVAN4uCKVizbQZGRWV')}}>Learn</button>
            <button className='btn btn-sm btn-outline-secondary'>OK</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeroSection
