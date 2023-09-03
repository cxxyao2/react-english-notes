import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SearchContextProvider } from 'contexts/SearchContext'
import { AuthContextProvider } from 'contexts/AuthContext'
import Layout from 'pages/Layout'
import NotFound from 'pages/NotFound'
import PrivateOutlet from './components/PrivateOutlet'
import { ToastContextProvider } from 'contexts/ToastContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const ArchivePage = lazy(() => import('./pages/ArchivePage'))
const LoginPage = lazy(() => import('./pages/Login'))
const DisplayPage = lazy(() => import('./pages/MarkdownDisplay'))
const EditPage = lazy(() => import('./pages/MarkdownEditor'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SearchBook = lazy(() => import('./pages/SearchBook'))

function App() {
	return (
		<ToastContextProvider>
			<SearchContextProvider>
				<AuthContextProvider>
					<Router>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route
									index
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<HomePage />
										</React.Suspense>
									}
								/>
								<Route path='/edit' element={<PrivateOutlet />}>
									<Route
										index
										element={
											<React.Suspense fallback={<div>Loading...</div>}>
												<EditPage />
											</React.Suspense>
										}
									/>
									<Route
										path=':id'
										element={
											<React.Suspense fallback={<div>Loading...</div>}>
												<DisplayPage />
											</React.Suspense>
										}
									/>
								</Route>

								<Route
									path='/search'
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<SearchPage />
										</React.Suspense>
									}
								/>

								<Route
									path='/books'
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<SearchBook />
										</React.Suspense>
									}
								/>

								<Route
									path='/login'
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<LoginPage />
										</React.Suspense>
									}
								/>
								<Route
									path='/archive'
									element={
										<React.Suspense fallback={<div>Loading...</div>}>
											<ArchivePage />
										</React.Suspense>
									}
								/>
								<Route path='*' element={<NotFound />} />
							</Route>
						</Routes>
					</Router>
				</AuthContextProvider>
			</SearchContextProvider>
		</ToastContextProvider>
	)
}

export default App
