"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./style.css";

export function Navbar() {
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuUserOpen, setMenuUserOpen] = useState(false);
  const [isUserLogged, setUserLogged] = useState(true);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonMenuRef = useRef<HTMLInputElement | null>(null);

  //  useEffect abaixo dedicado ao scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar o menu ao clicar fora do botão ou do menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Fecha o menu se o clique for fora do menu ou do botão
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonMenuRef.current &&
        !buttonMenuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    // Adiciona o listener para cliques fora do menu
    document.addEventListener("mousedown", handleClickOutside);

    // Limpa o listener ao desmontar o componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categoies = [
    { label: "category 1", href: "#" },
    { label: "category 2", href: "#" },
    { label: "category 3", href: "#" },
  ];

  const menuItems = [
    { label: "Inicio", href: "#" },
    { label: "Categorias", href: "#", options: categoies },
    { label: "Sobre", href: "#" },
    { label: "Contato", href: "#" },
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
    <nav className={`navbar ${isScrolled && "scrolled"}`}>
      <Link href="#" className="navbar--logo">
        <Image src="/logo.png" width={132} height={32} alt="logo" />
      </Link>

      <ul
        className={`navbar--menu ${isMenuOpen && "navbar--menu--active"}`}
        ref={menuRef}
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`navbar--menu--option ${item.options ? "navbar--menu-dropdown" : ""}`}
          >
            <Link href={item.href}>{item.label}</Link>
            <span className="navbar--menu-underline" />
          </li>
        ))}
      </ul>

      <div className="navbar--user-container">
        <button className="navbar--user" onClick={() => toggleMenuUser()}>
          <Image
            src="/avatar.png"
            width={32}
            height={32}
            alt="foto do usuário"
            className="navbar--user-image"
          />
        </button>
        {/* Dropdown menu */}
        <div
          className={`navbar--user-dropdown ${isMenuUserOpen && "navbar--user-dropdown--active"}`}
        >
          {isUserLogged ? (
            <>
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
            </>
          ) : (
            <ul>
              <li>
                <Link href="#">Entrar</Link>
              </li>
            </ul>
          )}
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
