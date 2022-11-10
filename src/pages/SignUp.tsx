import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is invalid'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Password must match'
    )
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const { signup, currentUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    alert('Success!!' + JSON.stringify(data))
    try {
      setLoading(true)
      await signup(data.email, data.password)
    } catch (error) {
      console.log('error is', error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className='card d-flex flex-column justify-content-center align-items-center'>
        <h2 className='text-center mb-4'>Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: '330px', padding: '15px' }}>
          <div className='d-flex w-100 flex-column justify-content-center align-items-center'>
            <div className='form-floating my-4'>
              <input
                id='email'
                type='email'
                {...register('email')}
                className='form-control'
                name='email'
              />
              <label htmlFor='floatingInput'>Email Address</label>
            </div>

            <div className='form-floating mb-4'>
              <input
                id='password'
                type='password'
                {...register('password')}
                className='form-control'
                name='password'
              />
              <label htmlFor='password'>Password</label>
            </div>

            <div className='form-floating mb-4'>
              <input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword')}
                className='form-control'
                name='confirmPassword'
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>

            {errors && errors.email && (
              <div className='row'>{errors.email?.message?.toString()}</div>
            )}

            {errors && errors.password && (
              <div className='row'>{errors.password?.message?.toString()}</div>
            )}

            {errors && errors.confirmPassword && (
              <div className=''>
                {errors.confirmPassword?.message?.toString()}
              </div>
            )}

            <div className='w-100'>
              <button
                type='submit'
                className='btn btn-primary mx-4'
                disabled={loading}>
                Register
              </button>
              <button
                type='button'
                onClick={() => reset()}
                className='btn btn-secondary'>
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
