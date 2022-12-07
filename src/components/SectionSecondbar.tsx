import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { initNavbarData } from '../constants'
import { useAppSelector, useAppDispatch } from 'hooks'
import { fetchStats, selectAllStats } from 'reducers/statsSlice'

import { useSearch } from 'contexts/SearchContext'

const SectionSecondbar = () => {
  const navigate = useNavigate()
  const { setSearchKey } = useSearch()
  const [data, setData] = useState(initNavbarData)
  const dispatch = useAppDispatch()
  const stats = useAppSelector(selectAllStats)
  const fetchStatus = useAppSelector((state) => state.stats.status)

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchStats())
    }
    if (fetchStatus === 'succeeded') {
      setData(stats)
    }
  }, [fetchStatus])



  return (
    <div className='nav-scroller row bg-body  shadow-sm'>
      <nav className='nav' aria-label='Secondary navigation'>
        {data &&
          data.map((stat) => (
            <button
              key={stat.name}
              className='nav-link active'
              onClick={() => {
                setSearchKey(stat.name)
                navigate('/search')
              }}>
              {stat.name}
              <span className='badge text-bg-info rounded-pill align-text-bottom'>
                {stat.unmastered}
              </span>
            </button>
          ))}
      </nav>
    </div>
  )
}

export default SectionSecondbar
