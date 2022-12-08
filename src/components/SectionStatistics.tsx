import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchStats, selectAllStats } from 'reducers/statsSlice'
import { useSearch } from 'contexts/SearchContext'

const SectionStatistics = () => {
  const { setIsLoading, setTopError } = useSearch()

  const dispatch = useAppDispatch()
  const stats = useAppSelector(selectAllStats)
  const fetchStatus = useAppSelector((state) => state.stats.status)
  const fetchError = useAppSelector((state) => state.stats.error)

  const totalLearnt =
    stats && stats.reduce((total, b) => total + (b.mastered ?? 0), 0)
  const totalNeedLearn =
    stats && stats.reduce((total, b) => total + (b.unmastered ?? 0), 0)

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
    <section id='statistics'>
      <div className='container bg-white'>
        <div className='row mb-2'>
          <div className='col'>
            <h3 className='pb-4 my-4 fst-italic border-bottom'>Statistics</h3>
            <p>
              We calculate the number of words you learnt according to your
              activities:
            </p>
            <table className='table'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Mastered</th>
                  <th>UnMastered</th>
                </tr>
              </thead>
              <tbody>
                {stats &&
                  stats.map((stat) => (
                    <tr key={stat.name}>
                      <td>{stat.name}</td>
                      <td>{stat.mastered}</td>
                      <td>{stat.unmastered}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Totals</td>
                  <td>{totalLearnt}</td>
                  <td>{totalNeedLearn}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionStatistics
