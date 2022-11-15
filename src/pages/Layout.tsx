import {
  Bars3Icon,
  GlobeAltIcon,
  HeartIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/outline'
import Asidebar from 'components/Asidebar'
import Footer from 'components/Footer'
import MyNavLink from 'components/MyNavLink'
import { useAuth } from 'contexts/AuthContext'
import { useSearch } from 'contexts/SearchContext'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const activeClassName = 'link--active'
const className = 'link'

function Layout() {
  const { isLoading, topError } = useSearch()
  const { currentUser, signOut } = useAuth()
  const [user, setUser] = useState('')
  useEffect(() => {
    const email:string = currentUser?.email || ''
    const index = email.indexOf('@')
    let name=''
    index>=0 && (name = email.slice(0,index))
    setUser(() => name)
  }, [currentUser])

  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        {topError && (
          <div
            className='position-fixed left-0 w-100'
            style={{ zIndex: 9999, top: '56px' }}>
            <div
              className='toast show align-items-center w-100 bg-white px-3'
              role='alert'
              aria-live='assertive'
              aria-atomic='true'>
              <div className='d-flex'>
                <div className='toast-body'>{topError}</div>
                <button
                  type='button'
                  className='btn-close me-2 m-auto'
                  data-bs-dismiss='toast'
                  aria-label='Close'></button>
              </div>
            </div>
          </div>
        )}
        <header className='sticky-top'>
          <nav className='navbar navbar-expand-lg bg-primary'>
            <div className='container-fluid d-flex'>
              <div className='d-md-none'>
                <button
                  type='button'
                  aria-label='toggle sidebar'
                  ref={toggleButtonRef}
                  data-bs-toggle='offcanvas'
                  data-bs-target='#sidebar'
                  aria-controls='sidebar'
                  className='py-0 px-1 border-0 rounded'>
                  <Bars3Icon width={24} height={24} />
                </button>
              </div>
              <a className='navbar-brand' href='/' aria-label='home'>
                <GlobeAltIcon
                  width={24}
                  height={24}
                  className='text-white'></GlobeAltIcon>
                <span className=' text-white fs-6'>English Notes</span>
              </a>

              <div
                className='align-items-center justify-content-end'
                tabIndex={-1}
                aria-label='Menu Section'>
                <div className='d-flex flex-row'>
                  <div className='d-none d-md-flex flex-grow-1 justify-content-center'>
                   <Link to="/search">
                    <button
                      type='button'
                      className='relative border-1 border-white border-md-1 border-md-white rounded  bg-transparent mx-4'
                      style={{ top: '-2px' }}>
                      <MagnifyingGlassIcon
                        width={24}
                        height={24}
                        className='text-white'></MagnifyingGlassIcon>
                      <span className='ms-2 text-white'>Search</span>
                    </button>
                    </Link>
                  </div>
                  <ul className='nav d-flex  flex-row align-items-center justify-content-end'>
                    <li className='d-none d-md-block nav-item me-4'>
                      <MyNavLink
                        to='/'
                        className={className}
                        activeClassName={activeClassName}>
                        Home
                      </MyNavLink>
                    </li>
                    <li className='d-none d-md-block nav-item me-4'>
                      <MyNavLink
                        to='/about'
                        className={className}
                        activeClassName={activeClassName}>
                        About
                      </MyNavLink>
                    </li>
                    <li className='d-none d-md-block nav-item me-4'>
                      <MyNavLink
                        to='/edit'
                        className={className}
                        activeClassName={activeClassName}>
                        Edit(Protected)
                      </MyNavLink>
                    </li>

                    {!user && (
                      <li className='nav-item'>
                        <MyNavLink
                          to='/login'
                          className={className}
                          activeClassName={activeClassName}>
                          Login
                        </MyNavLink>
                      </li>
                    )}
                    {user && (
                      <li className='nav-item'>
                        <a
                          className={className}
                          href='#'
                          onClick={() => signOut()}>
                          {user} &nbsp; Logout
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <Asidebar></Asidebar>

        <main style={{ minHeight: '300px' }}>
          <Outlet />
        </main>

        <Footer></Footer>
        {isLoading && (
          <div className='fixed-top w-100 h-100 d-flex flex-column align-items-center  justify-content-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}

        {/* <BackToTop */}
      </>
    </Suspense>
  )
}

export default Layout
