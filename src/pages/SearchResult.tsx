import { useState } from 'react'

import { useSearch } from 'contexts/SearchContext'
import SearchForm from '../components/SearchForm'
import GenreCard from '../components/GenreCard'

export default function SearchResult() {
  const { results } = useSearch()
  const [industry, setIndustry] = useState('')
  const industryList = [
    'Finance',
    'IT',
    'Weather',
    'Culture',
    'Sports',
    'Health'
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
    <div className='container my-2'>
      <div className='d-block'>
        <SearchForm />
      </div>
      <div className='d-flex flex-row justify-content-evenly align-items-center p-2 gap-2 flex-wrap'>
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
      <div
        className='border-top border-info bg-white rounded-2'
        style={{ minHeight: '300px' }}>
        <div className='row p-2 g-2 '>
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
          {(!results || results.length === 0) && (
            <div className='alert alert-danger' role='alert'>
              No data meet the selection criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
