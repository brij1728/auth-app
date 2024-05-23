import { SignInForm } from '../SignInForm';

export const SignIn = () => {
  return (
    <div className='mx-auto mt-10 max-w-md rounded-lg bg-primary/80 p-6 shadow-lg md:shadow-2xl'>
      <h1 className='mt-3 flex items-center justify-center'>Sign In</h1>
      <SignInForm />
    </div>
  );
};
