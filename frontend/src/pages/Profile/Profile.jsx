// src/pages/Profile/Profile.jsx
import React, { useState } from 'react';
import './Profile.scss';
import { MOCK_USER } from '../../mocks/userData';
import Header from '../../components/Header/Header';

const Profile = () => {
  const { surname, name, patronymic, birthDate, avatarUrl } = MOCK_USER;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    surname,
    name,
    patronymic,
    birthDate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Здесь можно отправить данные на сервер
    console.log('Сохранённые данные:', formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Откат к исходным данным
    setFormData({ surname, name, patronymic, birthDate });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="container">
        <h1>Мой профиль</h1>
        <div className="profile-content">
          <div className="profile-avatar-section">
            <img
              src={avatarUrl}
              alt="Аватар"
              className="profile-avatar"
              onError={(e) => {
                e.target.src = '/images/avatar-placeholder.jpg';
              }}
            />
          </div>

          <div className="profile-info">
            {isEditing ? (
              <>
                <div className="info-row">
                  <label className="label">Фамилия</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div className="info-row">
                  <label className="label">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div className="info-row">
                  <label className="label">Отчество</label>
                  <input
                    type="text"
                    name="patronymic"
                    value={formData.patronymic}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div className="info-row">
                  <label className="label">Дата рождения</label>
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="дд.мм.гггг"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="info-row">
                  <span className="label">Фамилия</span>
                  <span className="value">{formData.surname}</span>
                </div>
                <div className="info-row">
                  <span className="label">Имя</span>
                  <span className="value">{formData.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Отчество</span>
                  <span className="value">{formData.patronymic}</span>
                </div>
                <div className="info-row">
                  <span className="label">Дата рождения</span>
                  <span className="value">{formData.birthDate}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="profile-buttons">
          <button className="upload-photo-btn">Загрузить фото</button>
          {isEditing ? (
            <button className="edit-btn" onClick={handleSave}>
              Сохранить
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEdit}>
              Редактировать
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;