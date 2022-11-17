import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getMessageOfError } from 'utils'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is invalid')
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const { login } = useAuth()
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null)

  const onSubmit = async (data: any) => {
    try {
      setErrorFromServer(null)
      await login(data.email, data.password)
      navigate(redirectPath, { replace: true })
    } catch (error) {
      let errorMessage = getMessageOfError(error)
      setErrorFromServer(errorMessage)
    }
  }

  return (
    <div className='card d-flex flex-column justify-content-center align-items-center'>
      <h2 className='text-center mb-4'>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '330px', padding: '15px' }}>
        <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
          <div className='form-floating mt-4 mb-2'>
            <input
              id='email'
              type='email'
              {...register('email')}
              className='form-control'
              name='email'
            />
            <label htmlFor='email'>Email Address</label>
          </div>
          {errors && errors.email && (
            <div className='row text-danger'>
              {errors.email?.message?.toString()}
            </div>
          )}
          <div className='form-floating my-2'>
            <input
              id='password'
              type='password'
              {...register('password')}
              className='form-control'
              name='password'
            />
            <label htmlFor='password'>Password</label>
          </div>

          {errors && errors.password && (
            <div className='row text-danger mb-2'>
              {errors.password?.message?.toString()}
            </div>
          )}

          {errorFromServer && (
            <div className='w-100 text-center text-danger my-2'>
              {errorFromServer}
            </div>
          )}

          <div className='d-flex justify-content-around'>
            <button type='submit' className='btn btn-primary mx-4'>
              Login
            </button>
            <button
              type='button'
              onClick={() => reset()}
              className='btn btn-secondary'>
              Reset
            </button>
          </div>
          <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>sign up</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
