import { Link } from 'react-router-dom';
import React from 'react';

interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/signin', label: 'Sign In' },
  // { path: '/signup', label: 'Sign Up' },
  { path: '/about', label: 'About' },
  { path: '/profile', label: 'Profile' },
];

export const Menu: React.FC = () => {
  return (
    <nav className='bg-gray-800'>
      <div className='flex justify-between max-w-6xl mx-auto p-3 text-white text-xl'>
        <Link to='/'>
          <h1 className=' font-bold'>My App</h1>
        </Link>
        <ul className='flex flex-col md:flex-row gap-4 justify-between md:space-x-4'>
          {navLinks.map((link, index) => (
            <li key={index} className='md:mb-0 mb-2'>
              <Link className='text-white' to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
