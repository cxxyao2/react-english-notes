import React from 'react'
import { useSearch } from 'contexts/SearchContext'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { getAllStats } from 'services/stats-service'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

export default function SearchForm() {
  const { setSearchKey } = useSearch()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const val = e.currentTarget.value
    setSearchKey(val)
  }

  return (
    <form className='d-flex' role='search'>
      <div className='input-group'>
        <span className='input-group-text'>
          <MagnifyingGlassIcon
            width={32}
            height={32}
            className='text-primary'
          />
        </span>
        <input
          type='search'
          className='form-control'
          aria-label='Search Criteria'
          onKeyDown={(event) => {
            if (event.code === 'Enter' || event.code === 'Tab') {
              handleKeyDown(event)
            }
          }}
        />
      </div>
    </form>
  )
}
