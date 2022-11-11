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
import { Suspense, useRef } from 'react'
import { Outlet } from 'react-router-dom'

const activeClassName = 'link link--active'
const className = 'link link--unactive'

function Layout() {
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                      Catogry1
                    </MyNavLink>
                  </li>
                  <li className='d-none d-md-block nav-item me-4'>
                    <MyNavLink
                      to='/about'
                      className={className}
                      activeClassName={activeClassName}>
                      Edit(Protected)
                    </MyNavLink>
                  </li>
                  <li className='nav-item'>
                    <MyNavLink
                      to='/about'
                      className={className}
                      activeClassName={activeClassName}>
                      Login
                    </MyNavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Asidebar></Asidebar>

      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </Suspense>
  )
}

export default Layout
