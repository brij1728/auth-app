export const Header = () => {
  return (
    <>
      <nav className='bg-gray-800 p-4'>
        <ul className='flex justify-between'>
          <li>
            <a className='text-white' href='/'>
              Home
            </a>
          </li>
          <li>
            <a className='text-white' href='/signin'>
              Sign In
            </a>
          </li>
          <li>
            <a className='text-white' href='/signup'>
              Sign Up
            </a>
          </li>
          <li>
            <a className='text-white' href='/about'>
              About
            </a>
          </li>
          <li>
            <a className='text-white' href='/profile'>
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
