import React from 'react';

interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/signin', label: 'Sign In' },
  { path: '/signup', label: 'Sign Up' },
  { path: '/about', label: 'About' },
  { path: '/profile', label: 'Profile' },
];

export const Menu: React.FC = () => {
  return (
    <nav className='bg-gray-800 p-4'>
      <ul className='flex flex-col md:flex-row justify-between md:space-x-4'>
        {navLinks.map((link, index) => (
          <li key={index} className='md:mb-0 mb-2'>
            <a className='text-white' href={link.path}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
