import { TrashIcon } from '@heroicons/react/24/outline'
import { Note } from 'models/note'
import { Link } from 'react-router-dom'
import { deleteOneNote } from 'services/notes-service'
import { useSearch } from 'contexts/SearchContext'

type CardProps = {
  item: Note
}

export default function GenreCard({ item }: CardProps) {
  const { results, setResults } = useSearch()
  const categoryColor = item.category === 'word' ? 'text-info' : 'text-warning'
  return (
    <div
      className='card shadow position-relative overflow-hidden'
      style={{ minWidth: '18em', minHeight: '18em' }}>
      <div
        className={`position-absolute top-0 start-0   px-2 py-1  ${categoryColor}`}>
        {item.category}
      </div>
      <button
        aria-label='Delete'
        onClick={() => {
          if (window.confirm('Are you sure to delete the record?') !== true) {
            return
          }
          deleteOneNote(item.id || "").then()
          const newNoteList = results?.filter(
            (element) => element.id !== item.id
          )
          newNoteList && setResults(newNoteList)
        }}
        className='position-absolute top-0 end-0  rounded-2 px-2 py-1  bg-dark text-warning'>
        <TrashIcon style={{ width: '24px', height: '24px' }} />
      </button>
      <img
        src='//unsplash.it/300/300'
        className='card-img-top'
        alt='note'
        width={260}
        height={200}
        object-fit='cover'
      />
      <div className='card-body text-start d-flex flex-column align-items-stretch'>
        <h5 className='card-title mb-1'>{Array.isArray(item.keyword)?item.keyword.join(' '):item.keyword}</h5>
        <div className='fw-light mb-1' style={{ fontSize: '14px' }}>
          {item.created.toLocaleDateString()}
        </div>
        <p className='flex-grow-1 card-text mb-1'>
          <span
            style={{ fontSize: '12px', color: 'blue', fontStyle: 'italic' }}>
            {' '}
            {item.industry.toUpperCase()}&nbsp;
          </span>
          {item.content.slice(0, 100)}...
        </p>
        <div className=''>
          <Link to={`/display/${item.id}`} className='btn btn-primary '>
            Read more ...
          </Link>
        </div>
      </div>
    </div>
  )
}
