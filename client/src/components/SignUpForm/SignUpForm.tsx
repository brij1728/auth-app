import * as Yup from 'yup';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';

import { InputField } from '../InputField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getPasswordFeedback } from '../../utils';
import { signup } from '../../api/authService';
import { useDebounce } from '../../hooks';

interface SignupFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(
      8,
      'Password must be at least 8 characters and include numbers, uppercase, lowercase, and special characters.',
    )
    .required('Password is required'),
});

const handleSignupSubmit = async (
  values: SignupFormValues,
  { setSubmitting, setErrors, resetForm }: FormikHelpers<SignupFormValues>,
) => {
  try {
    await signup(values);
    alert('Signup successful!');
    resetForm();
  } catch (error: unknown) {
    console.error('Signup error:', error);
    if (axios.isAxiosError(error) && error.response) {
      setErrors({ password: error.response.data.message });
    } else {
      setErrors({ password: 'Network error or server is down.' });
    }
  } finally {
    setSubmitting(false);
  }
};

export const SignUpForm = () => {
  const [password, setPassword] = useState('');
  const debouncedPassword = useDebounce(password, 500);
  const [passwordFeedback, setPasswordFeedback] = useState({
    strength: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (debouncedPassword && debouncedPassword.length >= 8) {
      const feedback = getPasswordFeedback(debouncedPassword);
      setPasswordFeedback(feedback);
    } else {
      setPasswordFeedback({ strength: '', message: '' });
    }
  }, [debouncedPassword]);

  return (
    <Formik
      initialValues={{ name: '', username: '', email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignupSubmit}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => (
        <Form className='space-y-4'>
          <Field
            component={InputField}
            name='name'
            label='Name'
            type='text'
            placeholder='Enter your name'
            autoComplete='name'
          />
          <Field
            component={InputField}
            name='username'
            label='Username'
            type='text'
            placeholder='Enter your username'
            autoComplete='username'
          />
          <Field
            component={InputField}
            name='email'
            label='Email'
            type='email'
            placeholder='Enter your email'
            autoComplete='email'
          />
          <Field
            component={InputField}
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            autoComplete='new-password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setFieldValue('password', value);
              setPassword(value);
            }}
            extraFeedback={
              touched.password && errors.password
                ? ''
                : password.length >= 8
                  ? `Strength: ${passwordFeedback.strength} - ${passwordFeedback.message}`
                  : ''
            }
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
            Sign Up
          </button>
          <div className='flex items-center justify-between'>
            <Link
              to='/signin'
              className='text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
            >
              Already have an account? Sign In
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
