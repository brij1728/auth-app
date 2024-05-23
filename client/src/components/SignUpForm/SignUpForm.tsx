import { InputField } from '../InputField';
import { Link } from 'react-router-dom';

export const SignUpForm = () => {
  return (
    <form className='space-y-4'>
      <InputField
        id='name'
        label='Name'
        type='text'
        placeholder='Enter your name'
      />
      <InputField
        id='username'
        label='Username'
        type='text'
        placeholder='Enter your username'
      />
      <InputField
        id='password'
        label='Password'
        type='password'
        placeholder='Enter your password'
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
    </form>
  );
};
