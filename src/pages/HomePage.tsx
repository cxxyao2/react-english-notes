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
import {
  selectAllCards,
  fetchCards,
  selectCardById
} from './../reducers/cardsSlice'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectAllCards)
  const getCard = useAppSelector((state) => selectCardById(state, 'aaa'))
  const cardStatus = useAppSelector((state) => state.cards.status)

  const { setIsLoading, setTopError, freshCounter } = useSearch()

  const dataFetchRef = useRef(false)

  const fetchData = () => {
    //    setIsLoading(true)
    if (cardStatus === 'idle') {
      dispatch(fetchCards())
    }
  }

  useEffect(() => {
    if (dataFetchRef.current) return
    dataFetchRef.current = true
    if (cardStatus === 'idle') {
      dispatch(fetchCards())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardStatus, dispatch])

  // useEffect(() => {
  //   if (freshCounter === 0) return
  //   fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [freshCounter])

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
