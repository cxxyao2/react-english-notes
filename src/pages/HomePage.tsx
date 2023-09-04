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
import { useContext, useEffect } from 'react'
import { fetchStats } from './../reducers/statsSlice'
import { ToastContext } from 'contexts/ToastContext'

export default function HomePage() {
	// get all data here

	const dispatch = useAppDispatch()
	const { setIsLoading } = useSearch()
	const { setData } = useContext(ToastContext)

	const cardsError = useAppSelector((state) => state.cards.error)
	const statsError = useAppSelector((state) => state.stats.error)
	const topicsError = useAppSelector((state) => state.topics.error)
	const topicsStatus = useAppSelector(topicsStatusSelector)

	useEffect(() => {
		if (topicsStatus === 'idle' || topicsStatus === 'failed') {
			setIsLoading(true)
			Promise.all([
				dispatch(fetchCards()),
				dispatch(fetchStats()),
				dispatch(fetchTopics()),
				dispatch(fetchNotes())
			]).finally(() => {
				console.log()
				setIsLoading(false)
			})
		}
	}, [])

	useEffect(() => {
		const error = cardsError || statsError || topicsError || ''
		setData(error)
	}, [cardsError, statsError, topicsError, setData])

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
