import { INIT_CARD_DATA } from '../constants'
import { Note } from 'models/note'
import GenreCard from './GenreCard'

type Props = {
  results: Note[]
}

const SearchResult = ({ results }: Props) => {
  return (
    <div
      className='border-top border-info bg-white rounded-2'
      style={{ minHeight: '300px' }}>
      <div className='row p-2 g-2 '>
        {results &&
          results.map((item, index) => (
            <div
              key={index}
              className='col-12 col-md-6 col-lg-4 mx-auto border-2  text-center'>
              <div className=' d-flex flex-row justify-content-center align-items-center'>
                <GenreCard item={item} />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchResult
