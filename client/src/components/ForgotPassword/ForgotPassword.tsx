import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { InputField } from '../InputField';

// Validation schema using Yup for the email field
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});

export const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-auto mt-10 max-w-md rounded-lg bg-primary/80 p-6 shadow-lg md:shadow-2xl'>
      <h1 className='text-center text-lg font-bold text-secondary'>
        Forgot Password
      </h1>
      <p className='text-center text-sm text-secondary'>
        Enter your email address below and we&apos;ll send you a link to reset
        your password.
      </p>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Email for password reset:', values.email);
          setTimeout(() => {
            setSubmitting(false);
            navigate('/signin');
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='mt-6 space-y-4'>
            <Field
              component={InputField}
              id='email'
              name='email'
              label='Email Address'
              type='email'
              placeholder='Your email'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-md bg-btn px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-btn focus:ring-offset-2'
            >
              Send Reset Link
            </button>

            <div className='flex items-center justify-between'>
              <Link
                to='/signin'
                className='text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
              >
                Back to Sign In
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
