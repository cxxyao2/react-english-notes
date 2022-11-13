import React, { useEffect, useState, useRef } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { getAllStats } from 'services/stats-service'
import { Stats } from 'models/stats'
import SecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import HeroSection from 'components/HeroSection'

const initStates: Stats[] = [
  { name: 'Culture', mastered: 0, unmastered: 0 },
  { name: 'Weather', mastered: 0, unmastered: 0 },
  { name: 'Health', mastered: 0, unmastered: 0 },
  { name: 'Sports', mastered: 0, unmastered: 0 },
  { name: 'Finance', mastered: 0, unmastered: 0 },
  { name: 'IT', mastered: 0, unmastered: 0 }
]
export default function HomePage() {
  const { isLoading, setIsLoading, topError, setTopError } = useSearch()
  const [stats, setStats] = useState<Stats[]>(initStates)
  const dataFetchRef = useRef(false)

  const fetchData = () => {
    setIsLoading(true)
    getAllStats()
      .then((data) => {
        const newStats: Stats[] = []
        data.forEach((doc) => {
          newStats.push({
            id: doc.id,
            name: doc.data().name,
            mastered: doc.data().mastered,
            unmastered: doc.data().unmastered
          })
        })
        if (data.size > 0) {
          setStats(() => newStats)
        } else {
          setTopError('Database Error: Data fetching failded.')
        }
      })
      .catch((err) => {
        console.log('real error')
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

  // if (stats.length === 0) return <div>Loading...</div>
  return (
    <>
      <SecondNavbar stats={stats}></SecondNavbar>
      <HeroSection></HeroSection>
      {/* navigator section  */}
      <SectionWords stats={stats}></SectionWords>

      {/* Topics Section */}
      <SectionTopics stats={stats}></SectionTopics>
      <Statistics stats={stats}></Statistics>
      {/* TODO show Spinner */}
    </>
  )
}
