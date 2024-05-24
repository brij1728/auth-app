import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';

import { InputField } from '../InputField';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Password is required'),
});

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Login Submission:', values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='space-y-4'>
          <Field
            component={InputField}
            id='username'
            name='username'
            label='Username'
            type='text'
            placeholder='Enter your username'
          />
          <Field
            component={InputField}
            id='password'
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
          />
          <div className='flex items-center'>
            <input
              id='show-password'
              type='checkbox'
              className='mr-2'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor='show-password' className='text-sm text-secondary'>
              Show Password
            </label>
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-md bg-btn px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-btn focus:ring-offset-2'
          >
            Sign In
          </button>
          <div className='flex items-center justify-between'>
            <Link
              to='/forgot-password'
              className='text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
            >
              Forgot password?
            </Link>
            <Link
              to='/signup'
              className='text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
            >
              Sign Up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
