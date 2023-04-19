import React from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchRegistrationData,
  fetchUserData,
} from '../../redux/slices/authorization';

import { backendUrl } from '../../variables.js';
import { faceBookSVG } from '../SvgSprite';

import './index.css';

function FacebookLogin() {
  //default avatar url
  const defaultAvatarUrl = `${backendUrl}uploads/defaultAvatar.png`;
  //dispatch for redux
  const dispatch = useDispatch();
  //send user data to the backend for authorization / registration
  const sendUserData = () => {
    window.FB.api('/me', 'GET', { fields: 'name,email' }, async (res) => {
      if (res && !res.error) {
        const { name, email, id } = res;
        //trying to log in using Facebook data
        const authDdata = await dispatch(
          fetchUserData({ email, password: id })
        );
        if (authDdata.payload) {
          localStorage.setItem('token', authDdata.payload.token);
          localStorage.setItem('auth', 'FB');
        } else if (
          authDdata.error.message ===
          'Користувача з таким email або паролем не існує'
        ) {
          //trying to register using Facebook data
          const registrationData = await dispatch(
            fetchRegistrationData({
              fullName: name,
              email,
              password: id,
              avatarUrl: defaultAvatarUrl,
              emailConfirmed: true,
            })
          );
          if (registrationData.payload) {
            localStorage.setItem('token', registrationData.payload.token);
            localStorage.setItem('auth', 'FB');
          } else {
            alert(registrationData.error.message);
          }
        } else {
          alert(authDdata.error.message);
        }
      }
    });
  };
  //handle Facebook button click
  const handleLogin = () => {
    window.FB.login(
      (res) => {
        if (res.authResponse) {
          sendUserData();
        } else {
          alert('Нажаль, не вдалось авторизуватись за допомогою Facebook.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  React.useEffect(() => {
    //initialize the Facebook SDK
    const script = document.createElement('script');
    const initFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '6032401773507562',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v16.0',
        });
      };

      //download the Facebook SDK
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };
    initFacebookSDK();

    //removing the script component
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className='facebookLogin'>
      <button onClick={handleLogin}>{faceBookSVG}</button>
    </div>
  );
}

export default FacebookLogin;
