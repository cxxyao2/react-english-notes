import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { SearchContextProvider } from 'contexts/SearchContext'
import { AuthContextProvider } from 'contexts/AuthContext'
import Layout from 'pages/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NavBar = lazy(() => import('./pages/NavBar'))
const FooterPage = lazy(() => import('./components/Footer'))

function App() {
  return (
    <SearchContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path='/about'
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    <AboutPage />
                  </React.Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </SearchContextProvider>
  )
}

export default App
