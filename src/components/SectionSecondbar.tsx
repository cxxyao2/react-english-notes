import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks'
import { fetchStats, selectAllStats } from 'reducers/statsSlice'

import { useSearch } from 'contexts/SearchContext'

const SectionSecondbar = () => {
  const { setIsLoading, setTopError } = useSearch()

  const dispatch = useAppDispatch()
  const allStats = useAppSelector(selectAllStats)
  const fetchStatus = useAppSelector((state) => state.stats.status)
  const fetchError = useAppSelector((state) => state.stats.error)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      setIsLoading(true)
      setTopError('')
      dispatch(fetchStats())
    }
    if (fetchStatus === 'failed') {
      setIsLoading(false)
      setTopError(fetchError || 'Unknown error')
    }
    if (fetchStatus === 'succeeded') {
      setIsLoading(false)
      setTopError('')
    }
  }, [fetchStatus, dispatch])

  return (
    <div className='nav-scroller row bg-body  shadow-sm'>
      <nav className='nav' aria-label='Secondary navigation'>
        {allStats &&
          allStats.map((stat) => (
            <Link key={stat.name} className='nav-link active' to='/search'>
              {stat.name}
              <span className='badge text-bg-info rounded-pill align-text-bottom'>
                {stat.unmastered}
              </span>
            </Link>
          ))}
      </nav>
    </div>
  )
}

export default SectionSecondbar
