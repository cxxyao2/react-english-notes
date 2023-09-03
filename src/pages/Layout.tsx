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
			<div className='bg-white position-relative'>
				<Toast />
				<Asidebar></Asidebar>

				<main
					style={{ minHeight: '100vh' }}
					className='d-flex flex-column justify-content-between'>
					<Header></Header>
					<Outlet />
					<Footer></Footer>
				</main>

				<LoadingSpinner />

				{/* <BackToTop */}
			</div>
		</Suspense>
	)
}

export default Layout
