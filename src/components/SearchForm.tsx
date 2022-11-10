import React, { useState } from 'react'
import { useSearch } from 'contexts/SearchContext'

export default function SearchForm() {
  const { setSearchKey } = useSearch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const val = e.target.value
    setSearchKey(val)
  }
  return (
    <form className='d-flex' role='search'>
      <div className='input-group'>
        <span className='input-group-text'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='#fcfcfd'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#0000ff'
            width='24px'
            height='24px'
            className=''>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </span>
        <input
          type='search'
          className='form-control'
          aria-label='Search Criteria'
          onChange={handleChange}
        />
      </div>
    </form>
  )
}
