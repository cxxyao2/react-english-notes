import SectionSecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import SectionHero from 'components/SectionHero'

import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchCards } from 'reducers/cardsSlice'

import { fetchNotes } from 'reducers/notesSlice'
import { useSearch } from 'contexts/SearchContext'
import { fetchTopics, topicsStatusSelector } from 'reducers/topicsSlice'
import { useEffect } from 'react'
import { fetchStats } from './../reducers/statsSlice'
import { store } from 'store'

export default function HomePage() {
  // get all data here

  const dispatch = useAppDispatch()
  const { setIsLoading, setTopError } = useSearch()

  const cardsError = useAppSelector((state) => state.cards.error)
  const statsError = useAppSelector((state) => state.stats.error)
  const topicsError = useAppSelector((state) => state.topics.error)
  const topicsStatus = useAppSelector(topicsStatusSelector)

  useEffect(() => {
    if (topicsStatus !== 'idle') {
      return
    }
    setIsLoading(true)

    dispatch(fetchCards())
    dispatch(fetchStats())
    dispatch(fetchTopics())

    requestIdleCallback(() => dispatch(fetchNotes()))

    let debounceTimeout = setTimeout(() => {
      const jsonData = JSON.stringify(store.getState())
      localStorage.setItem('redux-data', jsonData)
    }, 1000)

    setIsLoading(false)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [])

  useEffect(() => {
    const error = cardsError || statsError || topicsError || ''
    setTopError(error)
  }, [cardsError, statsError, topicsError, setTopError])

  return (
    <>
      <SectionSecondNavbar></SectionSecondNavbar>

      <SectionHero></SectionHero>

      <SectionWords></SectionWords>

      <SectionTopics></SectionTopics>
      <Statistics></Statistics>
    </>
  )
}
