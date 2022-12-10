import { useSearch } from 'contexts/SearchContext'

const LoadingSpinner = () => {
  const { isLoading } = useSearch()
  if (!isLoading) return null

  return (
    <div className='fixed-top w-100 h-100 d-flex flex-column align-items-center  justify-content-center'>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
