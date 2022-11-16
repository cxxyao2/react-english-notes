import React, { useState } from 'react'
import { useSearch } from 'contexts/SearchContext'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchForm() {
  const { setSearchKey } = useSearch()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
