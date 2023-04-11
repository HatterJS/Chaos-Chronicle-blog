import React from 'react';
import axios from '../../../axios.js';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import {
  commentsSVG,
  createArticleSVG,
  deleteSVG,
  ratingSVG,
  warningSVG,
} from '../../../components/SvgSprite';
import { backendUrl } from '../../../variables.js';
import {
  fetchChangeUserData,
  logOut,
} from '../../../redux/slices/authorization.js';

function Settings() {
  //dispatch for redux
  const dispatch = useDispatch();
  //user data from redux
  const { avatarUrl, fullName, email, rating, userArticles, userComments } =
    useSelector((state) => state.authorization.userData);
  //ref for avatar input
  const inputAvatar = React.useRef();
  //default avatar url
  const defaultAvatarUrl = `${backendUrl}uploads/defaultAvatar.png`;
  //check login platform (FB or Site)
  const [loginPlatform, setLoginPlatform] = React.useState('');
  //state for user data
  const [registrationData, setRegistrationData] = React.useState({
    avatarUrl,
    fullName,
    email,
    password: '',
    confirmPassword: '',
  });
  //check user common data
  function userCommonValidation() {
    if (registrationData.fullName.length < 2) {
      return "Перевірте ім'я";
    }
    if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        registrationData.email
      )
    ) {
      return 'Перевірте email';
    }
    return 'Підтвердити';
  }
  //check user data
  function userPasswordValidation() {
    if (
      registrationData.password.length < 6 ||
      registrationData.password !== registrationData.confirmPassword
    ) {
      return 'Перевірте новий пароль';
    }
    return 'Підтвердити';
  }
  //send common data and get user data from backend
  async function sendNameData() {
    dispatch(
      fetchChangeUserData({
        fullName: registrationData.fullName,
      })
    );
  }
  //send password data and get user data from backend
  async function sendPasswordData() {
    dispatch(
      fetchChangeUserData({
        password: registrationData.password,
      })
    );
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
      deleteAvatar();
      setRegistrationData((prev) => ({
        ...prev,
        avatarUrl: backendUrl + data.url,
      }));
      dispatch(
        fetchChangeUserData({
          avatarUrl: backendUrl + data.url,
        })
      );
    } catch (err) {
      alert('Не вдалось завантажити аватар');
    }
  }
  //clear avatar
  function clearAvatar() {
    deleteAvatar();
    inputAvatar.current.value = '';
    setRegistrationData((prev) => ({ ...prev, avatarUrl: defaultAvatarUrl }));
    axios.patch(`/authorization/changeData`, {
      avatarUrl: defaultAvatarUrl,
    });
  }
  //delete avatar from server
  function deleteAvatar() {
    if (registrationData.avatarUrl !== defaultAvatarUrl) {
      axios.delete(
        `delete/${registrationData.avatarUrl.slice(
          registrationData.avatarUrl.lastIndexOf('/') + 1
        )}?dir=users`
      );
    }
  }
  //delete user account and all articles / comments
  function deleteAccount() {
    if (
      window.confirm(
        'УВАГА! Видалення облікового запису - незворотня процедура.\nВи дійсно бажаєте видалити обліковий запис?'
      )
    ) {
      axios
        .delete(`/authorization/delete`)
        .then((res) => {
          dispatch(logOut());
          localStorage.removeItem('token');
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    }
  }
  React.useEffect(() => {
    setLoginPlatform(localStorage.getItem('auth'));
  }, []);
  return (
    <div className='settings'>
      <div className='settings__mainData unselectable'>
        <div className='settings__statistics'>
          <div title='Рейтинг'>
            {ratingSVG}
            {rating}
          </div>
          <div title='Опубліковано статей'>
            {createArticleSVG}
            {userArticles}
          </div>
          <div title='Додано коментарів'>
            {commentsSVG}
            {userComments}
          </div>
        </div>
        <div className='settings__avatar'>
          <label htmlFor='avatar'>
            <img src={registrationData.avatarUrl} alt='avatar' />
          </label>
          <input
            ref={inputAvatar}
            type='file'
            name='avatar'
            id='avatar'
            accept='image/*'
            onChange={(event) => {
              uploadAvatar(event.target.files[0]);
            }}
          />
          {registrationData.avatarUrl !== defaultAvatarUrl && (
            <button onClick={clearAvatar}>{deleteSVG}</button>
          )}
        </div>
        <h3>{fullName}</h3>
      </div>
      <div className='settings__nameData'>
        <h3>Змінити ім'я:</h3>
        <div className='settings__inputField'>
          <input
            type='text'
            placeholder=' '
            value={registrationData.fullName}
            onChange={(event) =>
              setRegistrationData((prev) => ({
                ...prev,
                fullName: event.target.value,
              }))
            }
          />
          <div>Повне ім'я</div>
        </div>
        <div className='settings__inputField'>
          <input
            type='email'
            disabled
            placeholder=' '
            value={registrationData.email}
            onChange={(event) =>
              setRegistrationData((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />
          <div>E-mail</div>
        </div>
        <button
          className='acceptButton'
          onClick={sendNameData}
          disabled={userCommonValidation() !== 'Підтвердити'}
        >
          {userCommonValidation()}
        </button>
      </div>
      {loginPlatform === 'Site' && (
        <div className='settings__passwordData'>
          <h3>Змінити пароль:</h3>
          <div className='settings__inputField'>
            <input
              type='password'
              placeholder=' '
              autoComplete='new-password'
              value={registrationData.password}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
            <div>Новий пароль</div>
          </div>
          <div className='settings__inputField'>
            <input
              type='password'
              placeholder=' '
              autoComplete='new-password'
              value={registrationData.confirmPassword}
              onChange={(event) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
            />
            <div>Підтвердіть пароль</div>
          </div>
          <button
            className='acceptButton'
            onClick={sendPasswordData}
            disabled={userPasswordValidation() !== 'Підтвердити'}
          >
            {userPasswordValidation()}
          </button>
        </div>
      )}
      <div className='settings__deleteAccount'>
        <h3>Видалення облікового запису:</h3>
        <div className='settings__deleteWarning'>
          {warningSVG} УВАГА! Видалення облікового запису - незворотня
          процедура, що призведе до виделення доступу до написаних Вами статей
          та коментарів.
        </div>
        <button className='acceptButton' onClick={deleteAccount}>
          Видалити
        </button>
      </div>
    </div>
  );
}

export default Settings;
