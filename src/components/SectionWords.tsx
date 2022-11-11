import {
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline'
import { Stats } from 'models/stats'

type IProps = React.PropsWithChildren<{
  stats: Stats[]
}>

const icons = {
  it: ComputerDesktopIcon,
  finance: CurrencyDollarIcon,
  culture: FaceSmileIcon
}

// var MyComponent = Components[type + "Component"];
// return <MyComponent />;

const SectionWords = ({ stats }: IProps) => {
  const abc: Stats[] = [
    { name: 'it', mastered: 1, unmastered: 1 },
    { name: 'finance', mastered: 1, unmastered: 2 },
    { name: 'culture', mastered: 1, unmastered: 3 }
  ]
  const createCategory = (stat: Stats) => {
    type ObjectKey = keyof typeof icons
    const IconName = icons[stat.name as ObjectKey]

    return (
      <>
        <div className='d-flex flex-row align-items-center justify-content-start'>
          <div>
            <IconName
              className='text-primary'
              width={32}
              height={32}></IconName>
          </div>
          <div className='flex-grow-1 text-muted p-2' key={stat.id}>
            <div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
              <div className='d-flex justify-content-between'>
                <strong className='text-gray-dark'>{stat.name}</strong>
                <button className='btn btn-sm btn-primary btn rounded-pill'>
                  Get Started!
                </button>
              </div>
              <span className='d-block'>
                Need to memorize: {stat.unmastered}
              </span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <section id='words'>
      <div className='row g-5 my-2'>
        <div className='col'>
          <h3 className='pb-4 mb-4 fst-italic border-bottom'>Words Section</h3>
          {abc.map((stat) => createCategory(stat))}
        </div>
      </div>
    </section>
  )
}

export default SectionWords
