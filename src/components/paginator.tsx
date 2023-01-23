import MDEditor from '@uiw/react-md-editor'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

type PaginatorProps = {
  className: string
  itemCount: number
  pageChanged: (currentPage: number, itemNumberPerpage: number) => void
}

const Paginator = ({
  className = '',
  itemCount,
  pageChanged
}: PaginatorProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [itemNumberPerPage, setItemNumberPerPage] = useState(5)

  useEffect(() => {
    // calculate pageNUmber
    const newTotalPage = Math.max(Math.ceil(itemCount / itemNumberPerPage), 1)
    setTotalPage(() => newTotalPage)
  }, [itemCount, itemNumberPerPage])

  return (
    <div
      className={`d-flex  justify-content-start align-items-center   ${className}`}>
      <div className='d-flex align-items-center '>
        per page{' '}
        <select
          aria-label='select page number'
          className='px-2 mx-1 rounded-sm'
          onChange={(e) => {
            setItemNumberPerPage(parseInt(e.target.value))
            pageChanged(1, parseInt(e.target.value))
          }}>
          <option value={5}> 5</option>
          <option value={10}> 10</option>
          <option value={15}> 15</option>
          <option value={20}> 20</option>
        </select>
      </div>
      <div>
        Page {currentPage} of {totalPage}{' '}
      </div>
      <div className='flex mx-4'>
        <ChevronLeftIcon
          onClick={() => {
            if (currentPage <= 1) return
            setCurrentPage((current) => {
              let newCurrent = current > 1 ? current - 1 : current
              pageChanged(newCurrent, itemNumberPerPage)
              return newCurrent
            })
          }}
          style={{ height: '1rem', width: '1rem' }}
          className='mr-2 text-bg-primary'
        />

        <ChevronRightIcon
          onClick={() => {
            if (currentPage >= totalPage) return
            setCurrentPage((current) => {
              let newCurrent = current >= totalPage ? current : current + 1
              pageChanged(newCurrent, itemNumberPerPage)
              return newCurrent
            })
          }}
          style={{ height: '1rem', width: '1rem' }}
          className='ml-2 text-bg-secondary'
        />
      </div>
    </div>
  )
}

export default Paginator
