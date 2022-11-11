import { Stats } from 'models/stats'
import topicImg from './SectionTopicIT.jpg'

type IProps = React.PropsWithChildren<{
  stats: Stats[]
}>

const SectionTopics = ({ stats }: IProps) => {
  return (
    <section id='topics'>
    <div className='row g-0 mb-2'>
      <div className='col'>
        <h3 className='pb-4 mb-4 fst-italic border-bottom'>
          Topics Section
        </h3>
        <div className='row g-0 border rounded overflow-hidden flex-md-row m-4 shadow-sm h-md-250 position-relative'>
          <div className='col-md-4 text-center align-self-center'>
            <img src={topicImg} className='img-fluid' alt='example' />
          </div>
          <div className='col col-md-8  d-flex flex-column position-static p-2 ps-md-4'>
            <strong className='d-inline-block mb-2 text-primary'>
              World
            </strong>
            <h3 className='mb-0'>Featured post</h3>
            <div className='mb-1 text-muted'>Nov 12</div>
            <p className='card-text mb-auto'>
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
            <a href='#' className='stretched-link'>
              Continue reading
            </a>
          </div>
        </div>

        <div className='row g-0 border rounded overflow-hidden flex-md-row  m-4 shadow-sm h-md-250 position-relative'>
          <div className='col-md-4 order-md-last text-center align-self-center'>
            <img src={topicImg} className='img-fluid' alt='example' />
          </div>
          <div className='col col-md-8  d-flex flex-column position-static p-2 pe-4'>
            <strong className='d-inline-block mb-2 text-primary'>
              World
            </strong>
            <h3 className='mb-0'>2Featured post</h3>
            <div className='mb-1 text-muted'>Nov 12</div>
            <p className='card-text mb-auto'>
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
            <a href='#' className='stretched-link'>
              Continue reading
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SectionTopics
