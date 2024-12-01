'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import './style.css';

export function Navbar() {
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuUserOpen, setMenuUserOpen] = useState(false);
  const [isModalLoginOpen, setModalLoginOpen] = useState(false);

  const isUserLogged = true;
  console.log(isModalLoginOpen);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonMenuRef = useRef<HTMLInputElement | null>(null);

  //  useEffect abaixo dedicado ao scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonMenuRef.current &&
        !buttonMenuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const toggleMenu = (active?: boolean) => {
    setMenuUserOpen(false);
    setMenuOpen((prev) => active ?? !prev);
  };

  const toggleMenuUser = (active?: boolean) => {
    setMenuOpen(false);
    setMenuUserOpen((prev) => active ?? !prev);
  };

  return (
    <nav className={`navbar ${isScrolled && 'scrolled'}`}>
      <Link href="#" className="navbar--logo">
        <Image src="/logo.png" width={133} height={33} alt="logo" />
      </Link>

      <ul
        className={`navbar--menu ${isMenuOpen && 'navbar--menu--active'}`}
        ref={menuRef}
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`navbar--menu--option ${item.options ? 'navbar--menu-dropdown' : ''}`}
          >
            <Link href={item.href}>{item.label}</Link>
            <span className="navbar--menu-underline" />
          </li>
        ))}
      </ul>

      <div className="navbar--user-container">
        <button
          className="navbar--user"
          // onClick={() => toggleMenuUser()}
          onClick={() => {
            if (!isUserLogged) {
              setModalLoginOpen(true);
            } else {
              toggleMenuUser();
            }
          }}
        >
          <Image
            src="/avatar.png"
            width={33}
            height={33}
            alt="foto do usuário"
            className="navbar--user-image"
          />
        </button>

        {/* Dropdown menu */}
        <div
          className={`navbar--user-dropdown ${isMenuUserOpen && 'navbar--user-dropdown--active'}`}
        >
          <div>
            <span>Hiago Briano</span>
            <span>hiago.artist@hotmail.com</span>
          </div>
          <ul>
            <li>
              <Link href="#">Perfil</Link>
            </li>
            <li>
              <Link href="#">Sair</Link>
            </li>
          </ul>
        </div>
        <input
          type="checkbox"
          role="button"
          className="navbar--hamburger"
          checked={isMenuOpen}
          onChange={() => toggleMenu()}
          ref={buttonMenuRef}
        />
      </div>
    </nav>
  );
}
