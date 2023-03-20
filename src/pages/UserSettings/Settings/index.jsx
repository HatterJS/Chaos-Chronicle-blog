import React from 'react';
import axios from '../../../axios.js';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { commentsSVG, createArticleSVG, deleteSVG, ratingSVG } from '../../../components/SvgSprite';
import { logOut } from '../../../redux/slices/authorization.js';
import { backendUrl } from '../../../variables.js';

function Settings() {
  // create dispatch for redux
  const dispatch = useDispatch();
  //user data from redux
  const { fullName, email, avatarUrl, rating, userArticles, userComments } = useSelector(
    (state) => state.authorization.userData
  );
  //ref for avatar input
  const inputAvatar = React.useRef();
  //default avatar url
  const defaultAvatarUrl = 'http://localhost:3000/img/avatars/defaultAvatar.png';
  //current avatar URL
  const [currentAvatarUrl, setCurrentAvatarUrl] = React.useState('');
  //readOnly status for input password because of autocompleate
  const [readOnly, setReadOnly] = React.useState(true);
  //state for user data
  const [registrationData, setRegistrationData] = React.useState({
    avatarUrl,
    fullName,
    email,
    password: '',
    confirmPassword: '',
    currentPassword: ''
  });
  //send registration data and get user data from backend
  async function sendUserData() {
    try {
      const { data } = await axios.patch(`/authorization/changeData`, {
        ...registrationData,
        password: registrationData.password || registrationData.currentPassword
      });
      alert(data.message);
      dispatch(logOut());
    } catch (err) {
      alert(err.response.data.message);
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
      registrationData.password &&
      (registrationData.password.length < 6 ||
        registrationData.password !== registrationData.confirmPassword)
    ) {
      return 'Перевірте пароль';
    }
    if (!registrationData.currentPassword.length) {
      return 'Вкажіть Ваш пароль';
    }
    return 'Підтвердити';
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
      setRegistrationData((prev) => ({
        ...prev,
        avatarUrl: backendUrl + data.url
      }));
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
  return (
    <div className="settings">
      <div className="settings__mainData">
        <div className="settings__statistics">
          <div title="Рейтинг">
            {ratingSVG}
            {rating}
          </div>
          <div title="Опубліковано статей">
            {createArticleSVG}
            {userArticles}
          </div>
          <div title="Додано коментарів">
            {commentsSVG}
            {userComments}
          </div>
        </div>
        <div className="settings__avatar">
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
        <div className="settings__inputField">
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
        <div className="settings__inputField">
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
        <h3>Зміна паролю:</h3>
        <div className="settings__inputField">
          <input
            type="password"
            readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            placeholder=" "
            value={registrationData.password}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, password: event.target.value }))
            }
          />
          <div>Новий пароль</div>
        </div>
        <div className="settings__inputField">
          <input
            type="password"
            readOnly={readOnly}
            onFocus={() => setReadOnly(false)}
            onBlur={() => setReadOnly(true)}
            placeholder=" "
            value={registrationData.confirmPassword}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, confirmPassword: event.target.value }))
            }
          />
          <div>Підтвердіть пароль</div>
        </div>
      </div>
      <div className="settings__confirmField">
        <div className="setting__advice">
          Будь ласка переконайтесь, що зазначені дані відповідають дійсності.
        </div>
        <div className="settings__inputField">
          <input
            type="password"
            placeholder=" "
            value={registrationData.currentPassword}
            onChange={(event) =>
              setRegistrationData((prev) => ({ ...prev, currentPassword: event.target.value }))
            }
          />
          <div>Ваш пароль</div>
        </div>
        <button
          className="acceptButton"
          onClick={sendUserData}
          disabled={userDataValidation() !== 'Підтвердити'}>
          {userDataValidation()}
        </button>
      </div>
    </div>
  );
}

export default Settings;
