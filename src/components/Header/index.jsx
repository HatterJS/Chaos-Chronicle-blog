import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isAuthCheck, logOut } from '../../redux/slices/authorization';

import './index.css';

import {
  houseSVG,
  infoSVG,
  contactSVG,
  authorizationSVG,
  createArticleSVG,
  logOutSVG,
  userSettingSVG
} from '../SvgSprite';

function Header({ setIsShowForm }) {
  //create dispatch for redux
  const dispatch = useDispatch();
  //check authorization with redux
  const isAuth = useSelector(isAuthCheck);

  function handleLogOut() {
    if (window.confirm('Ви дійсно бажаєте вийти?')) {
      dispatch(logOut());
      localStorage.removeItem('token');
    }
  }

  return (
    <header>
      <a href="/" className="header__logo">
        <img src="/img/logo/dub.png" width={105} height={45} alt="logo" />
      </a>
      <div className="header__links">
        <Link to={'/'}>
          <div className="header__home">
            {houseSVG}
            <p>Головна</p>
          </div>
        </Link>
        <Link to={'/about'}>
          <div className="header__about">
            {infoSVG}
            <p>Про блог</p>
          </div>
        </Link>
        <Link to={'/contacts'}>
          <div className="header__contacts">
            {contactSVG}
            <p>Контакти</p>
          </div>
        </Link>
      </div>
      <div className="header__user">
        {!isAuth ? (
          <button className="header__authorization" onClick={setIsShowForm}>
            {authorizationSVG}
            <p>Авторизація</p>
          </button>
        ) : (
          <div className="header__authorizedUserButtons">
            <Link to={'/usersetting'}>
              <button className="header__userSetting">{userSettingSVG}</button>
            </Link>
            <Link to={'/addarticle'}>
              <button className="header__createArticle">
                {createArticleSVG}
                <p>Нова стаття</p>
              </button>
            </Link>
            <button className="header__logOut" onClick={handleLogOut}>
              {logOutSVG}
              <p>Вийти</p>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
