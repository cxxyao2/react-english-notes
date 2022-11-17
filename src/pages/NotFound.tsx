import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='d-flex rounded-2 text-center' style={{minHeight:"70vh"}}>
      Not Found. Please check your url or go to &nbsp;
      <Link to='/'>
        <span>HomePage</span>
      </Link>
    </div>
  )
}
