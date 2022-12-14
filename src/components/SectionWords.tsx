import {
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline'

import { Stats } from 'models/stats'
import { useAppSelector } from 'hooks'
import { selectAllStats } from 'reducers/statsSlice'

const icons = {
  it: ComputerDesktopIcon,
  finance: CurrencyDollarIcon,
  culture: FaceSmileIcon,
  health: ComputerDesktopIcon,
  weather: CurrencyDollarIcon,
  sports: FaceSmileIcon
}

const SectionWords = () => {
  const data = useAppSelector(selectAllStats)
  const createCategory = (stat: Stats) => {
    type ObjectKey = keyof typeof icons
    const IconName = icons[stat.name.toLowerCase() as ObjectKey]

    return (
      <div key={stat.name} className='container white'>
        <div className='d-flex flex-row align-items-center justify-content-start'>
          <div>
            <IconName
              className='text-primary'
              width={24}
              height={24}></IconName>
          </div>
          <div className='flex-grow-1 text-muted p-1' key={stat.id}>
            <div className='pb-2 mb-0 small lh-sm border-bottom w-100'>
              <div className='d-flex justify-content-between'>
                <strong className='text-gray-dark'>{stat.name}</strong>
                <button className='btn btn-sm btn-primary btn rounded-pill'>
                  Get Started!
                </button>
              </div>
              <span className='d-block'>new: {stat.unmastered}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <section id='words'>
      <div className='container bg-white'>
        <div className='row g-4 mt-1 mb-2'>
          <div className='col'>
            <h3 className='pb-4 mb-4 fst-italic border-bottom'>
              Words Section
            </h3>
            {data.map((stat) => createCategory(stat))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionWords
