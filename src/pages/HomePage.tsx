import React, { useEffect, useState, useRef } from 'react'
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
    setSectionTopicData,
    freshCounter
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
              hitCounter: doc.data().hitCounter || 1,
              id: doc.id,
              initId: doc.data().initId
            })

          newCards.sort((a, b) => a.created.getTime() - b.created.getTime())

          doc.data().section === 'topic' &&
            newTopics.push({
              language: doc.data().language || 'en',
              category: 'topic',
              keyword: doc.data().keyword,
              created: doc.data().created.toDate() || new Date(),
              content: doc.data().content,
              industry: doc.data().industry || 'IT',
              mastered: doc.data().mastered || false,
              hitCounter: doc.data().hitCounter || 1,
              id: doc.id,
              initId: doc.data().initId
            })
        })
        newTopics.sort((a, b) => a.created.getTime() - b.created.getTime())

        if (newStats.length > 0) {
          setSectionNavbarData(() => newStats)
          setSectionCardData(() => newCards)
          setSectionTopicData(() => newTopics)
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

  useEffect(() => {
    if (freshCounter === 0) return
    fetchData()
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
