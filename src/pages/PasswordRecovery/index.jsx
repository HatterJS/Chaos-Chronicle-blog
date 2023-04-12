import React from 'react';
import { Link, useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle/index';

import { userSettingSVG } from '../../components/SvgSprite';
import unlockSVG from '../../assets/img/unlockSVG.svg';
import securitySVG from '../../assets/img/security.svg';
import settingsSVG from '../../assets/img/settings.svg';
import './index.css';

function PasswordRecovery() {
  //get token from URL
  const { id: token } = useParams();
  React.useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('auth', 'Site');
  }, [token]);
  return (
    <div className='recovery unselectable'>
      <PageTitle title={'Відновлення доступу'} />
      <div className='recovery__body'>
        <div className='recovery__unlockCard'>
          <h3>1. Відновлення доступу</h3>
          <img src={unlockSVG} alt='unlock' width={200} height={200} />
          <p>
            Ви отримали тимчасовий доступ до свого облікового запису. Це
            допоможе у випадку, якщо Ви забули свій пароль.
          </p>
        </div>
        <div className='recovery__securityCard'>
          <h3>2. Заходи безпеки</h3>
          <img src={securitySVG} alt='security' width={200} height={200} />
          <p>
            Ваш пароль зберігається у зашифрованому вигляді. Якщо Ви забули
            пароль вказаний під час реєстрації, відновити його не можливо. Але
            Ви можете встановити новий пароль.
          </p>
        </div>
        <div className='recovery__settingsCard'>
          <h3>3. Зміна паролю</h3>
          <img src={settingsSVG} alt='settings' width={200} height={200} />
          <p>
            Для відновлення постійного доступу необхідно перейти до налаштувань
            облікового запису та змінити пароль.
          </p>
          <Link to={'/usersettings/settings'}>
            {userSettingSVG}Налаштування
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
