import React, { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { useSearch } from 'contexts/SearchContext'
import SearchForm from './SearchForm'
import GenreCard from './GenreCard'

export default function SearchResult() {
  const { results } = useSearch()
  const [industry, setIndustry] = useState('')
  const industryList = [
    'finance',
    'IT',
    'weather',
    'culture',
    'sports',
    'health'
  ]
  const industryClass = [
    'badge text-bg-primary',
    'badge text-bg-secondary',
    'badge text-bg-success',
    'badge text-bg-danger',
    'badge text-bg-warning',
    'badge text-bg-info'
  ]

  return (
    <>
      <div className='d-block  d-lg-none d-xl-none d-xxl-none'>
        <SearchForm />
      </div>
      <div className='d-flex flex-row justify-content-evenly align-items-center p-4 gap-2 flex-wrap'>
        {industryList.map((item, index) => (
          <button
            key={item}
            className={industryClass[index]}
            onClick={() => setIndustry(item)}>
            {item}
            {industry === item && (
              <span>
                &nbsp;(
                {results?.filter((e) => e.industry.includes(industry)).length})
              </span>
            )}
          </button>
        ))}
      </div>
      <br className='bg-info border-t-2' />
      <div className='border-top border-info'>
        <div className='row p-4 g-4 '>
          {results &&
            results
              .filter((item) => item.industry.includes(industry))
              .map((item) => (
                <div
                  key={item.id || 'a'}
                  className='col-12 col-md-6 col-lg-4 mx-auto border-2  text-center'>
                  <div className=' d-flex flex-row justify-content-center align-items-center'>
                    <GenreCard item={item} />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}
function setState(arg0: string): [any, any] {
  throw new Error('Function not implemented.')
}
