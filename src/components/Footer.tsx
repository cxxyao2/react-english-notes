import { GlobeAltIcon } from '@heroicons/react/24/outline'
import SvgGithub from './SvgGithub'
import SvgLinkedin from './SvgLinkedin'
import SvgTwitter from './SvgTwitter'

const Footer = () => {
  return (
    <div className='container'>
      <footer className='d-flex flex-wrap justify-content-between align-items-center p-1 my-2 border-top'>
        <div className='col-md-4 d-flex align-items-center'>
          <a
            href='/'
            className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
            aria-label='Company Icon'>
            <GlobeAltIcon
              width={30}
              height={24}
              fill='var(--color-blue-middle)'></GlobeAltIcon>
          </a>
          <p className='mb-3 mb-md-0 text-bg-primary px-2 rounded-2'>
            &copy; 2022 Jennifer,&nbsp;Canada
          </p>
        </div>

        <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
          <li className='ms-3'>
            <a className='text-muted' href='# ' aria-label='twitter icon'>
              <SvgTwitter />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-muted' href='# ' aria-label='instagram icon'>
              <SvgGithub />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-muted' href='# ' aria-label='facebook icon'>
              <SvgLinkedin></SvgLinkedin>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
