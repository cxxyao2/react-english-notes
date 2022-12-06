import { Stats } from 'models/stats'
import topicImg from './images/jt_ikpglw_c_scale_w_612.jpg'
import { useSearch } from 'contexts/SearchContext'
import { useEffect, useState } from 'react'
import { initTopicData } from '../constants'
import { Link } from 'react-router-dom'

const SectionTopics = () => {
  const [data, setData] = useState(initTopicData)
  const { sectionTopicData: topics } = useSearch()
  const textColors = ['text-primary', 'text-success']

  useEffect(() => {
    if (topics && topics.length > 0) {
      setData(topics)
    }
  }, [topics])

  return (
    <section id='topics'>
      <div className='container bg-white'>
        <div className='row g-0 mb-2'>
          <div className='col'>
            <h3 className='pb-4 my-4 fst-italic border-bottom'>
              Topics Section
            </h3>

            <div className='row mb-2'>
              {data.map((ele, index) => (
                <div key={ele.keyword} className='col-md-6' role='article'>
                  <div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
                    <div className='col p-4 d-flex flex-column position-static'>
                      <strong
                        className={`d-inline-block mb-2 ${textColors[index]}`}>
                        {ele.industry.toUpperCase()}
                      </strong>

                      <h3 className='mb-0 text-truncate' style={{width:'150px'}}>
                        {ele.keyword
                          .charAt(0)
                          .toUpperCase()
                          .concat(ele.keyword.slice(1))}
                      </h3>
                      <div className='mb-1 text-muted'>
                        {new Date(ele.created).toDateString()}
                      </div>
                      <p className='card-text mb-auto'>
                        {ele.content.slice(0, 30)}...
                      </p>
                      <Link
                        to={`/edit/${ele.initId}`}
                        className='stretched-link'>
                        Continue reading
                      </Link>
                    </div>
                    <div className='col-auto d-none d-lg-block'>
                      <img
                        src={topicImg}
                        width='200px'
                        height={'250px'}
                        style={{ objectFit: 'cover' }}
                        alt='topic'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionTopics
