'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from './user';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setScrolled] = useState(false);

  //  useEffect abaixo dedicado ao scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoies = [
    { label: 'category 1', href: '#' },
    { label: 'category 2', href: '#' },
    { label: 'category 3', href: '#' },
  ];

  const menuItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Categorias', href: '#', options: categoies },
    { label: 'Sobre', href: '#' },
    { label: 'Contato', href: '#' },
  ];

  return (
    <nav
      className={`sticky top-0  flex items-center justify-between px-8 py-02 transition-all ease-in-out duration-500 ${isScrolled ? 'h-12 shadow-md bg-white' : 'h-20'}`}
    >
      <Link href="/" className="flex-1">
        <Image src="/logo.png" alt="logo" width={133} height={33} />
      </Link>

      <ul
        className={`flex-1 flex items-center justify-center gap-4 ${isScrolled ? '' : 'text-lg'}`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {menuItems.map((item, index) => {
          // if (item.options) {
          //   return (
          //     <Dropdown
          //       key={index}
          //       label={item.label}
          //       inline
          //       className={`block py-2 px-3 relative group rounded md:p-0 transition-all duration-300 `}
          //     >
          //       {item.options.map((option, i) => (
          //         <Dropdown.Item key={i} href={option.href}>
          //           {option.label}
          //         </Dropdown.Item>
          //       ))}
          //     </Dropdown>
          //   );
          // }

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`block py-2 px-3 relative group rounded md:p-0 transition-all duration-300`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 md:bg-sky-700 transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex-1 flex justify-end">
        <User />
      </div>
    </nav>
  );
}
