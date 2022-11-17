import { GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { useAuth } from 'contexts/AuthContext'
import { useEffect, useRef, useState } from 'react'
import MyNavLink from './MyNavLink'

const Asidebar = () => {
  const { currentUser, signOut } = useAuth()
  const [user, setUser] = useState('')
  useEffect(() => {
    const email: string = currentUser?.email || ''
    const index = email.indexOf('@')
    let name = ''
    index >= 0 && (name = email.slice(0, index))
    setUser(() => name)
  }, [currentUser])

  const closeRef = useRef<HTMLButtonElement>(null)
  return (
    <div
      className='offcanvas offcanvas-start'
      tabIndex={-1}
      id='sidebar'
      aria-labelledby='sidebarLabel'
      style={{ width: '280px' }}>
      <div className='offcanvas-header border-bottom'>
        <h5 className='offcanvas-title text-monospace' id='sidebarLabel'>
          <GlobeAmericasIcon
            width={32}
            height={32}
            className='text-primary'></GlobeAmericasIcon>
          Hello {user ? user : ''}
        </h5>
        <button
          ref={closeRef}
          type='button'
          className='btn-close'
          data-bs-dismiss='offcanvas'
          aria-label='Close'></button>
      </div>
      <div className='offcanvas-body'>
        <ul className='nav nav-pills flex-column mb-auto'>
          <li
            className='nav-item'
            onClick={() => {
              closeRef?.current?.click()
            }}>
            <MyNavLink
              to='/'
              className='nav-link'
              activeClassName='nav-link active'>
              Home
            </MyNavLink>
          </li>
          <li
            className='nav-item'
            onClick={() => {
              closeRef?.current?.click()
            }}>
            <MyNavLink
              to='/edit'
              className='nav-link'
              activeClassName='nav-link active'>
              Edit
            </MyNavLink>
          </li>
          <li
            className='nav-item'
            onClick={() => {
              closeRef?.current?.click()
            }}>
            <MyNavLink
              to='/search'
              className='nav-link'
              activeClassName='nav-link active'>
              Search
            </MyNavLink>
          </li>
          <li
            className='nav-item'
            onClick={() => {
              closeRef?.current?.click()
            }}>
            <MyNavLink
              to='/about'
              className='nav-link'
              activeClassName='nav-link active'>
              About
            </MyNavLink>
          </li>
          <hr />
          <li
            className='nav-item'
            onClick={() => {
              closeRef?.current?.click()
            }}>
            <button className='nav-link' onClick={() => signOut()}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Asidebar
