import { Link } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import {  selectAllStats } from 'reducers/statsSlice'


const SectionSecondbar = () => {

  const allStats = useAppSelector(selectAllStats)


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
