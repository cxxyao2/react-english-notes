import { useSearch } from 'contexts/SearchContext'
import { initNavbarData } from '../constants'
import { useEffect, useState } from 'react'

const SectionSecondbar = () => {
  const [data, setData] = useState(initNavbarData)
  const { sectionNavbarData: stats } = useSearch()
  useEffect(() => {
    if (stats && stats.length > 0) {
      setData(stats)
    }
  }, [stats])

  return (
    <div className='nav-scroller row bg-body  shadow-sm'>
      <nav className='nav' aria-label='Secondary navigation'>
        {data &&
          data.map((stat) => (
            <a
              key={stat.name}
              className='nav-link active'
              aria-current='page'
              href='# '>
              {stat.name}
              <span className='badge text-bg-info rounded-pill align-text-bottom'>
                {stat.unmastered}
              </span>
            </a>
          ))}
      </nav>
    </div>
  )
}

export default SectionSecondbar
