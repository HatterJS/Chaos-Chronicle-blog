import React from 'react';
import axios from '../../axios.js';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import { fetchRegistrationData, isAuthCheck } from '../../redux/slices/authorization';
import { closeSVG, deleteSVG } from '../../components/SvgSprite';

function Registration() {
  //ref for avatar input
  const inputAvatar = React.useRef();
  //default avatar url
  const defaultAvatarUrl = 'http://localhost:3000/img/avatars/defaultAvatar.png';
  //create dispatch for redux
  const dispatch = useDispatch();
  //check is authorized from redux
  const isAuthorized = useSelector(isAuthCheck);
  const [currentAvatarUrl, setCurrentAvatarUrl] = React.useState('');
  //create state for user data
  const [registrationData, setRegistrationData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: defaultAvatarUrl
  });
  //send registration data and get user data from backend
  async function sendRegistrationData() {
    const data = await dispatch(fetchRegistrationData(registrationData));
    if (data.payload) {
      localStorage.setItem('token', data.payload.token);
      setRegistrationData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatarUrl: defaultAvatarUrl
      });
    } else {
      alert(data.error.message);
    }
  }
  //catch Enter on last input field
  function handleLastInputKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendRegistrationData();
    }
  }
  //check user data
  function userDataValidation() {
    if (registrationData.fullName.length < 2) {
      return "Перевірте ім'я";
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registrationData.email)) {
      return 'Перевірте email';
    }
    if (
      registrationData.password.length < 6 ||
      registrationData.password !== registrationData.confirmPassword
    ) {
      return 'Перевірте пароль';
    }
    return 'Реєстрація';
  }
  //upload avatar to server
  async function uploadAvatar(file) {
    if (file.size > 100000) {
      alert('Розмір файлу перевищує 100кБ');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post(`/upload?dir=users`, formData);
      currentAvatarUrl &&
        (await axios.delete(
          `delete/${currentAvatarUrl.slice(currentAvatarUrl.lastIndexOf('/') + 1)}?dir=users`
        ));
      setRegistrationData((prev) => ({ ...prev, avatarUrl: 'http://localhost:9999' + data.url }));
      setCurrentAvatarUrl(data.url);
    } catch (err) {
      alert('Не вдалось завантажити аватар');
    }
  }
  //delete avatar from server
  function deleteAvatar() {
    axios.delete(
      `delete/${currentAvatarUrl.slice(currentAvatarUrl.lastIndexOf('/') + 1)}?dir=users`
    );
  }
  //clear avatar
  function clearAvatar() {
    currentAvatarUrl && deleteAvatar();
    inputAvatar.current.value = '';
    setRegistrationData((prev) => ({ ...prev, avatarUrl: defaultAvatarUrl }));
  }
  //if authorizet redirect to home page
  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="registration">
      <div className="registration__title">
        <div></div>
        <h1>Реєстрація</h1>
        <div></div>
      </div>
      <div className="registration__form">
        <Link to={'/'} className="registration__close">
          {closeSVG}
        </Link>
        <div className="registration__avatar">
          <label htmlFor="avatar">
            <img src={registrationData.avatarUrl} alt="avatar" />
          </label>
          <input
            ref={inputAvatar}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={(event) => {
              uploadAvatar(event.target.files[0]);
            }}
          />
          {registrationData.avatarUrl !== defaultAvatarUrl && (
            <button onClick={clearAvatar}>{deleteSVG}</button>
          )}
        </div>
        <div className="registration__inputField">
          <input
            type="text"
            placeholder=" "
            value={registrationData.fullName}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, fullName: event.target.value }))
            }
          />
          <div>Повне ім'я</div>
        </div>
        <div className="registration__inputField">
          <input
            type="email"
            placeholder=" "
            value={registrationData.email}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <div>E-mail</div>
        </div>
        <div className="registration__inputField">
          <input
            type="password"
            placeholder=" "
            value={registrationData.password}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, password: event.target.value }))
            }
            onKeyUp={handleLastInputKey}
          />
          <div>Password</div>
        </div>
        <div className="registration__inputField">
          <input
            type="password"
            placeholder=" "
            value={registrationData.confirmPassword}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, confirmPassword: event.target.value }))
            }
            onKeyUp={handleLastInputKey}
          />
          <div>Confirm password</div>
        </div>
        <div className="registration__buttons">
          <button
            className="acceptButton"
            onClick={sendRegistrationData}
            disabled={userDataValidation() !== 'Реєстрація'}>
            {userDataValidation()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
