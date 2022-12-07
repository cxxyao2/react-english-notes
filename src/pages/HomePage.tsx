import SectionSecondNavbar from 'components/SectionSecondbar'
import Statistics from 'components/SectionStatistics'
import SectionWords from 'components/SectionWords'
import SectionTopics from 'components/SectionTopics'
import SectionHero from 'components/SectionHero'

export default function HomePage() {
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
