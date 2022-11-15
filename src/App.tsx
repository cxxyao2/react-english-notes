import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SearchContextProvider } from 'contexts/SearchContext'
import { AuthContextProvider } from 'contexts/AuthContext'
import Layout from 'pages/Layout'
import NotFound from 'pages/NotFound'
import PrivateOutlet from './components/PrivateOutlet'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const LoginPage = lazy(() => import('./pages/Login'))
const DisplayPage = lazy(() => import('./pages/MarkdownDisplay'))
const EditPage = lazy(() => import('./pages/MarkdownEditor'))
const SearchPage = lazy(() => import('./pages/SearchResult'))

function App() {
  return (
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
              </Route>
              <Route
                path='/display/:id'
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <DisplayPage />
                  </React.Suspense>
                }
              />
              <Route
              path='/search'
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <SearchPage />
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
                path='/about'
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <AboutPage />
                  </React.Suspense>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </SearchContextProvider>
  )
}

export default App
