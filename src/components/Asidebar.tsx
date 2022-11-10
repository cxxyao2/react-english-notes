import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

// type IProps = React.PropsWithChildren<{
//   onClick: () => void
// }>

const Asidebar = () => {
  return (
    <div
      className='offcanvas offcanvas-start'
      tabIndex={-1}
      id='sidebar'
      aria-labelledby='sidebarLabel'>
      <div className='offcanvas-header border-bottom'>
        <h5 className='offcanvas-title' id='sidebarLabel'>
          Words And Articles
        </h5>
        <button
          type='button'
          className='btn-close'
          data-bs-dismiss='offcanvas'
          aria-label='Close'></button>
      </div>
      <div className='offcanvas-body'>
        <div>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </div>
        <div className='dropdown mt-3'>
          <button
            className='btn btn-secondary dropdown-toggle'
            type='button'
            data-bs-toggle='dropdown'>
            Dropdown button
          </button>
          <ul className='dropdown-menu'>
            <li>
              <a className='dropdown-item' href='#'>
                Action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Another action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Asidebar
