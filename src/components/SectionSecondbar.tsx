import { Stats } from 'models/stats'

type IProps = React.PropsWithChildren<{
  stats: Stats[]
}>

const SectionSecondbar = ({ stats }: IProps) => {
  return (
    <div className='nav-scroller row bg-body  shadow-sm'>
      <nav className='nav' aria-label='Secondary navigation'>
        {stats.map((stat) => (
          <a className='nav-link active' aria-current='page' href='#'>
            {stat.name}
            <span className='badge text-bg-warning rounded-pill align-text-bottom'>
              {stat.unmastered}
            </span>
          </a>
        ))}
      </nav>
    </div>
  )
}

export default SectionSecondbar
