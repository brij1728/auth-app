import { Link } from 'react-router-dom';
import React from 'react';

interface NavLink {
  path: string;
  label: string;
}

interface MenuPopupProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

export const MenuPopup: React.FC<MenuPopupProps> = ({
  isOpen,
  navLinks,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-end items-start'>
      <div className='bg-gray-800 p-5 rounded-lg shadow-lg'>
        <ul className='text-white space-y-4 text-center'>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={onClose}
                className='hover:text-gray-300 transition duration-300 block py-2'
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className='mt-4 text-white font-semibold' onClick={onClose}>
              Close
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
