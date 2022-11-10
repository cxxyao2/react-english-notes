import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='d-flex rounded-2 text-center'>
      Not Found. Please check your url or go to &nbsp;
      <Link to='/'>
        <a>HomePage</a>
      </Link>
    </div>
  )
}
