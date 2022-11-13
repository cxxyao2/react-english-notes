import topicImg from './SectionTopicIT.jpg'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <div className='ds-card-grid'>
      {[1, 2, 3, 4, 5, 6].map((ele) => (
        <div key={ele} className='ds-card'>
          <div className='img-wrapper'>
            <img loading='lazy' src={topicImg} />
          </div>
          <div className='mt-1 mb-2'>
            <div className='' style={{ fontSize: '12px' }}>
              2021.12. click 12 times
            </div>
            <div style={{ maxWidth: '200px', overflowWrap: 'break-word' }}>
              wordddddddddddddd1&nbsp;&nbsp;|&nbsp;&nbsp;word2
              &nbsp;&nbsp;|&nbsp;&nbsp;word3
            </div>
          </div>
          <div className='d-flex justify-content-between my-2'>
            <button className='btn btn-sm btn-primary'>Learn</button>
            <button className='btn btn-sm btn-outline-secondary'>OK</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeroSection
