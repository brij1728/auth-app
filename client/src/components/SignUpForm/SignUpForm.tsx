import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { InputField } from '../InputField';
import { Link } from 'react-router-dom';
import { getPasswordFeedback } from '../../utils';
import { useDebounce } from '../../hooks';

// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string()
    .min(
      8,
      'Password must be at least 8 characters, include numbers, uppercase, lowercase, and special characters',
    )
    .required('Password is required'),
});

export const SignUpForm = () => {
  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState({
    strength: '',
    message: '',
  });
  const debouncedPassword = useDebounce(password, 500);

  useEffect(() => {
    if (debouncedPassword) {
      const feedback = getPasswordFeedback(debouncedPassword);
      console.log('Password:', debouncedPassword, 'Feedback:', feedback);
      setPasswordFeedback(feedback);
    }
  }, [debouncedPassword]);

  return (
    <Formik
      initialValues={{ name: '', username: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Final Submission Values:', values);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form className='space-y-4' onSubmit={handleSubmit}>
          <Field
            component={InputField}
            name='name'
            label='Name'
            type='text'
            placeholder='Enter your name'
          />
          <Field
            component={InputField}
            name='username'
            label='Username'
            type='text'
            placeholder='Enter your username'
          />
          <Field
            component={InputField}
            name='password'
            label='Password'
            type='password'
            placeholder='Enter your password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              console.log('Password onChange:', value);
              setFieldValue('password', value);
              setPassword(value);
            }}
            extraFeedback={`Strength: ${passwordFeedback.strength} - ${passwordFeedback.message}`}
          />
          <button
            type='submit'
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
