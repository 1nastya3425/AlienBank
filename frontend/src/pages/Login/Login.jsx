// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../../mocks/userData';
import Header from '../../components/Header/Header';



const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === MOCK_USER.email && formData.password === MOCK_USER.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    } else {
      alert('Неверный email или пароль');
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="container">
      <div className="login-container">
        <h1>Войти</h1>
        <p>Пожалуйста, войдите в свой аккаунт заново.</p>

        <form onSubmit={handleSubmit}>
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

          <div className="forgot-password">
            <a href="#">Забыли пароль?</a>
          </div>

          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>

        <div className="switch-link">
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </div>
      </div>
      </main>
    </div>
  );
};

export default Login;