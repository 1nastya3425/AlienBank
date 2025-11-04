// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // В демо-режиме просто сохраняем как "текущего пользователя"
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', formData.email);
    // Для Home/Profile можно сохранить и другие данные
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
    }));

    navigate('/');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Регистрация</h1>
        <p>Управляйте финансами легко! Создайте аккаунт и откройте множество возможностей!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Электронная почта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Зарегистрироваться
          </button>
        </form>

        <div className="switch-link">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </div>
      </div>
    </div>
  );
};

export default Register;