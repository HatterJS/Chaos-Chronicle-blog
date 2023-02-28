import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserData, isAuthCheck } from '../../redux/slices/authorization';

import { faceBookSVG, googleSVG, instagramSVG } from '../SvgSprite';

import './index.css';

function AuthorizationForm({ isShowForm, setIsShowForm }) {
  //create dispatch for redux
  const dispatch = useDispatch();
  //get user data from redux
  const isAuth = useSelector(isAuthCheck);
  //create state for email and password
  const [authData, setAuthData] = React.useState({
    email: '',
    password: ''
  });
  //send authorization data and get user data from backend
  async function sendAuthData() {
    const data = await dispatch(fetchUserData(authData));
    if (data.payload) {
      localStorage.setItem('token', data.payload.token);
    } else {
      alert('Нажаль, авторизація пройшла не успішно.');
    }
  }
  React.useEffect(() => {
    isAuth && setIsShowForm(false);
  }, [isAuth, setIsShowForm]);
  return (
    <div className={isShowForm ? 'authorizationForm show' : 'authorizationForm hint'}>
      <div className="authorizationForm__shadow" onClick={() => setIsShowForm(false)}></div>
      <div className="authorizationForm__form">
        <div className="authorizationForm__header">
          <h2>Авторизація</h2>
        </div>
        <div className="authorizationForm__body">
          <div className="authorizationForm__inputField">
            <input
              type="email"
              placeholder=" "
              value={authData.email}
              onChange={(event) => setAuthData((prev) => ({ ...prev, email: event.target.value }))}
            />
            <div>E-mail</div>
          </div>
          <div className="authorizationForm__inputField">
            <input
              type="password"
              placeholder=" "
              value={authData.password}
              onChange={(event) =>
                setAuthData((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <div>Password</div>
          </div>
          <div className="authorizationForm__buttons">
            <button className="acceptButton" onClick={sendAuthData}>
              Вхід
            </button>
            <button className="cancelButton" onClick={() => setIsShowForm(false)}>
              Відхилити
            </button>
          </div>
          <div className="authorizationForm__registration">
            <p>Відсутній акаунт?</p>
            <Link to="/registration" onClick={setIsShowForm}>
              Реєстрація.
            </Link>
          </div>
          <div className="authorizationForm__social">
            {googleSVG}
            {faceBookSVG}
            {instagramSVG}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationForm;
