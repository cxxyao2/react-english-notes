import React, { useMemo, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { INIT_INDUSTRIES } from '../constants'
import debounce from 'lodash.debounce'

type Props = {
  triggerSearch: (arg: FormData) => void
}

export default function SearchForm({ triggerSearch }: Props) {
  const industryList = [...INIT_INDUSTRIES]
  const checks = ['Mastered', 'Unmastered']
  const industryclassName = [
    'badge text-bg-primary',
    'badge text-bg-secondary',
    'badge text-bg-success',
    'badge text-bg-danger',
    'badge text-bg-warning',
    'badge text-bg-info'
  ]

  const formRef = useRef<HTMLFormElement>(null)

  const renderRadiobuttonGroup = () => (
    <>
      <div className='mb-3'>
        <div className='d-flex flex-row justify-content-evenly align-items-center p-2 gap-2 flex-wrap'>
          {industryList.map((item, index) => (
            <div key={index} className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='industry'
                id={`industry${index}`}
                value={item}
                onChange={changeHandler}
              />
              <label
                className={`form-check-label ${industryclassName[index]} `}
                htmlFor={`industry${index}`}>
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (!formRef.current) {
      return
    }
    const formData = new FormData(formRef.current)
    triggerSearch(formData)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler])

  return (
    <form noValidate ref={formRef} role='search'>
      <div className='mb-3'>
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
            name='keyword'
            id='keyword'
            onChange={debouncedChangeHandler}
          />
        </div>
      </div>

      <div className='mb-3 d-flex justify-content-center'>
        {checks.map((checkName) => (
          <div key={checkName} className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='checkbox'
              name={`check${checkName}`}
              id={`check${checkName}`}
              value='true'
              onChange={debouncedChangeHandler}
            />
            <label className='form-check-label' htmlFor={`check${checkName}`}>
              {checkName}
            </label>
          </div>
        ))}
      </div>

      {renderRadiobuttonGroup()}
    </form>
  )
}
