import { useSearch } from 'contexts/SearchContext'

const Toast = () => {
  const { topError } = useSearch()
  if (!topError) return null

  return (
    <div
      className='position-fixed left-0 w-100'
      style={{ zIndex: 2000, top: '56px' }}>
      <div
        className='toast show align-items-center w-100 bg-white px-3 text-danger'
        role='alert'
        aria-live='assertive'
        aria-atomic='true'>
        <div className='d-flex'>
          <div className='toast-body'>{topError}</div>
          <button
            type='button'
            className='btn-close me-2 m-auto'
            data-bs-dismiss='toast'
            aria-label='Close'></button>
        </div>
      </div>
    </div>
  )
}

export default Toast
