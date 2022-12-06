import { useEffect, useRef } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { getAllStats } from 'services/stats-service'
import { Stats } from 'models/stats'
import SecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import SectionHero from 'components/SectionHero'
import { getMessageOfError } from 'utils'
import { Note } from 'models/note'
import { useAppDispatch, useAppSelector } from 'hooks'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state=>state.cards.data)
  const {
    setIsLoading,
    setTopError,
    setSectionCardData,
    setSectionNavbarData,
    setSectionTopicData,
    freshCounter
  } = useSearch()

  const dataFetchRef = useRef(false)

  const fetchData = () => {
    setIsLoading(true)

  }

  useEffect(() => {
    if (dataFetchRef.current) return
    dataFetchRef.current = true
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (freshCounter === 0) return
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshCounter])

  return (
    <>
      <SecondNavbar></SecondNavbar>

      <SectionHero></SectionHero>

      <SectionWords></SectionWords>

      <SectionTopics></SectionTopics>
      <Statistics></Statistics>
    </>
  )
}
