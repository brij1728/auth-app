import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { MenuPopup } from '../MenuPopup';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/signin', label: 'Sign In' },
  { path: '/about', label: 'About' },
  { path: '/profile', label: 'Profile' },
];

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className='bg-gray-800'>
        <div className='flex  justify-between items-stretch max-w-6xl mx-auto p-3 text-white text-xl'>
          <Link to='/' onClick={closeMenu} className='font-bold'>
            My App
          </Link>
          <button
            className='text-white focus:outline-none md:hidden'
            onClick={toggleMenu}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>

          {isOpen && (
            <MenuPopup
              isOpen={isOpen}
              navLinks={navLinks}
              onClose={closeMenu}
            />
          )}
          <div className='hidden md:flex space-x-4'>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className='text-white hover:text-gray-300 transition duration-300'
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-50'
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};
