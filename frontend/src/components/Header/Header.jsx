// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>МультиБанк</h1>
      </div>
      <nav className="header-nav-center">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/stats">Статистика</NavLink>
        <NavLink to="/profile">Профиль</NavLink>
      </nav>
    </header>
  );
};

export default Header;