'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginModel } from '../../LoginModel';

export function User() {
  const [isOpen, setOpen] = useState(false);
  const [isOpenRegister, setOpenRegister] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const registeredUser = false;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options = [
    { label: 'Perfil', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Configurações', href: '#' },
    { label: 'Sair', href: '#' },
  ];

  return (
    <div ref={menuRef}>
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
        onClick={() => {
          if (!registeredUser) {
            setOpenRegister(true);
          } else {
            setOpen((prev) => !prev);
          }
        }}
      >
        <span className="sr-only">abrir menu de usuário</span>
        <Image
          className="w-8 h-8 rounded-full"
          src="/avatar.png"
          alt="user photo"
          width={33}
          height={33}
        />
      </button>

      <div
        className={`z-50 my-4 text-base list-none  bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-2 ${isOpen ? 'block' : 'hidden'}`}
      >
        {registeredUser && (
          <>
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900">Hiago Briano</span>
              <span className="block text-sm  text-gray-500 truncate">
                hiago.artist@hotmail.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {options.map((option, index) => (
                <li key={index}>
                  <Link
                    href={option.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <LoginModel open={isOpenRegister} close={() => setOpenRegister(false)} />
    </div>
  );
}
