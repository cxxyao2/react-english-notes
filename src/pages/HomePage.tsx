import React, { useEffect, useState, useRef } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { getAllStats } from 'services/stats-service'
import { Stats } from 'models/stats'
import SecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import HeroSection from 'components/HeroSection'
import { getMessageOfError } from 'utils'
import { Note } from 'models/note'

export default function HomePage() {
  const {
    isLoading,
    setIsLoading,
    topError,
    setTopError,
    sectionCardData,
    setSectionCardData,
    sectionTopicData,
    setSectionNavbarData,
    sectionNavbarData,
    setSectionTopicData
  } = useSearch()

  const dataFetchRef = useRef(false)

  const fetchData = () => {
    setIsLoading(true)
    getAllStats()
      .then((data) => {
        const newStats: Stats[] = []
        const newCards: Note[] = []
        const newTopics: Note[] = []
        data.forEach((doc) => {
          console.log('doc is', doc.data())
          doc.data().section === 'navbar' &&
            newStats.push({
              id: doc.id,
              name: doc.data().name,
              mastered: doc.data().mastered,
              unmastered: doc.data().unmastered
            })
          doc.data().section === 'card' &&
            newCards.push({
              language: doc.data().language || 'en',
              category: 'word',
              keyword: doc.data().keyword,
              created: doc.data().created.toDate() || new Date(),
              content: doc.data().content,
              industry: doc.data().industry || 'IT',
              mastered: doc.data().mastered || false,
              hitCounter: doc.data().hitcounter,
              sequence: doc.data().sequence,
              id: doc.data().id,
              initId: doc.data().initId
            })

          doc.data().section === 'topic' &&
            newTopics.push({
              language: doc.data().language || 'en',
              category: 'topic',
              keyword: doc.data().keyword,
              created: doc.data().created.toDate() || new Date(),
              content: doc.data().content,
              industry: doc.data().industry || 'IT',
              mastered: doc.data().mastered || false,
              hitCounter: doc.data().hitcounter || 1,
              sequence: doc.data().sequence,
              id: doc.data().id,
              initId: doc.data().initId
            })
        })
        if (newStats.length > 0) {
          setSectionNavbarData(newStats)
          setSectionCardData(newCards)
          setSectionTopicData(newTopics)
        } else {
          setTopError('Database Error: Data fetching failded.')
        }
      })
      .catch((err) => {
        const errorMessage = getMessageOfError(err)
        setTopError(errorMessage)
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
      <SecondNavbar></SecondNavbar>

      <HeroSection></HeroSection>

      <SectionWords></SectionWords>

      <SectionTopics></SectionTopics>
      <Statistics></Statistics>
    </>
  )
}
