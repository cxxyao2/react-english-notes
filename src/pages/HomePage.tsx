import React, { useEffect, useState, useRef } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { getAllStats } from 'services/stats-service'
import { Stats } from 'models/stats'

export default function HomePage() {
  const { isLoading, setIsLoading } = useSearch()
  const [stats, setStats] = useState<Stats[]>([])
  const dataFetchRef = useRef(false)

  const fetchData = () => {
    setIsLoading(true)
    getAllStats()
      .then((data) => {
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          stats.push({
            id: doc.id,
            name: doc.data().name,
            mastered: doc.data().mastered,
            unmastered: doc.data().unmastered
          })
        })
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
      {stats.map((stat) => (
        <div key={stat.id}>{stat.name}</div>
      ))}
    </>
  )
}
