import SectionSecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import SectionHero from 'components/SectionHero'

import { useAppDispatch, useAppSelector } from 'hooks'
import { selectAllCards, fetchCards, updateCard } from 'reducers/cardsSlice'
import { selectAllStats, updateStat } from 'reducers/statsSlice'
import { selectAllNotes, updateNote, fetchNotes } from 'reducers/notesSlice'
import { useNavigate } from 'react-router-dom'
import { useSearch } from 'contexts/SearchContext'
import { fetchTopics, selectAllTopics } from 'reducers/topicsSlice'
import { useEffect } from 'react'
import { fetchStats } from './../reducers/statsSlice'

export default function HomePage() {
  // get all data here
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { setIsLoading, setTopError } = useSearch()

  const cardsError = useAppSelector((state) => state.cards.error)
  const statsError = useAppSelector((state) => state.stats.error)
  const topicsError = useAppSelector((state) => state.topics.error)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      dispatch(fetchCards()),
      dispatch(fetchStats()),
      dispatch(fetchTopics())
    ])
      .then(() => {
        dispatch(fetchNotes())
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    const error = cardsError || statsError || topicsError || ''
    setTopError(error)
  }, [cardsError, statsError, topicsError])

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
