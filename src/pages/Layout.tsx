import Asidebar from 'components/Asidebar'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingSpinner from 'components/LoadingSpinner'

import Toast from 'components/Toast'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Toast />
        <Header></Header>
        <Asidebar></Asidebar>

        <main style={{ minHeight: '70vh' }}>
          <Outlet />
        </main>

        <Footer></Footer>
        <LoadingSpinner />

        {/* <BackToTop */}
      </>
    </Suspense>
  )
}

export default Layout
