import React, { useEffect, useState, useRef } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { getAllStats } from 'services/stats-service'
import { Stats } from 'models/stats'
import SecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'

const initStates: Stats[] = [
  { name: 'IT', mastered: 0, unmastered: 0 },
  { name: 'Finance', mastered: 0, unmastered: 0 },
  { name: 'Culture', mastered: 0, unmastered: 0 },
  { name: 'Health', mastered: 0, unmastered: 0 },
  { name: 'Weather', mastered: 0, unmastered: 0 },
  { name: 'Sports', mastered: 0, unmastered: 0 }
]
export default function HomePage() {
  const { isLoading, setIsLoading } = useSearch()
  const [stats, setStats] = useState<Stats[]>(initStates)
  const dataFetchRef = useRef(false)

  const fetchData = () => {
    setIsLoading(true)
    getAllStats()
      .then((data) => {
        const newStats: Stats[] = []
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          newStats.push({
            id: doc.id,
            name: doc.data().name,
            mastered: doc.data().mastered,
            unmastered: doc.data().unmastered
          })
        })
        setStats(() => newStats)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (dataFetchRef.current) return
    dataFetchRef.current = true
    fetchData()
  }, [])

  if (stats.length === 0) return <div>Loading...</div>
  return (
    <>
      <SecondNavbar stats={stats}></SecondNavbar>

      <div className='container bg-white'>
        {/* navigator section  */}
        <SectionWords stats={stats}></SectionWords>

        {/* Topics Section */}
        <SectionTopics stats={stats}></SectionTopics>
        <Statistics stats={stats}></Statistics>
      </div>
    </>
  )
}
