import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import {
  fetchRegistrationData,
  fetchUserData,
} from '../redux/slices/authorization';

function GoogleAuth() {
  //dispatch for redux
  const dispatch = useDispatch();
  //send user data to the backend for authorization / registration
  const sendUserData = async (res) => {
    const decode = jwtDecode(res.credential);
    const { name, email, sub, picture: avatarUrl } = decode;
    // trying to log in using Google data
    const authDdata = await dispatch(fetchUserData({ email, password: sub }));
    if (authDdata.payload) {
      localStorage.setItem('token', authDdata.payload.token);
      localStorage.setItem('auth', 'Google');
    } else if (
      authDdata.error.message ===
      'Користувача з таким email або паролем не існує'
    ) {
      //trying to register using Google data
      const registrationData = await dispatch(
        fetchRegistrationData({
          fullName: name,
          email,
          password: sub,
          avatarUrl,
          emailConfirmed: true,
        })
      );
      if (registrationData.payload) {
        localStorage.setItem('token', registrationData.payload.token);
        localStorage.setItem('auth', 'Google');
      } else {
        alert(registrationData.error.message);
      }
    } else {
      alert(authDdata.error.message);
    }
  };

  return (
    <div className='GoogleAuth'>
      <GoogleLogin
        onSuccess={(res) => {
          sendUserData(res);
        }}
        onError={() => {
          alert('Не вдалось авторизуватись за допомогою Google.');
        }}
        type='icon'
        theme='filled_blue'
        shape='circle'
      />
    </div>
  );
}

export default GoogleAuth;
