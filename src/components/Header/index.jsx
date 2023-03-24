import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../redux/slices/authorization';

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
  const { userData } = useSelector((state) => state.authorization);

  function handleLogOut() {
    if (window.confirm('Ви дійсно бажаєте вийти?')) {
      dispatch(logOut());
      localStorage.removeItem('token');
    }
  }

  return (
    <header className="unselectable">
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
        {!userData ? (
          <button className="header__authorization" onClick={setIsShowForm}>
            {authorizationSVG}
            <p>Авторизація</p>
          </button>
        ) : (
          <div className="header__authorizedUserButtons">
            <Link
              to={'/addarticle'}
              className={
                userData.emailConfirmed
                  ? 'header__createArticle'
                  : 'header__createArticle disabledLink'
              }>
              {createArticleSVG}
              <p>Нова стаття</p>
            </Link>
            <Link
              to={'/usersettings/settings'}
              className={
                userData.emailConfirmed
                  ? 'header__createArticle'
                  : 'header__createArticle disabledLink'
              }>
              {userSettingSVG}
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
