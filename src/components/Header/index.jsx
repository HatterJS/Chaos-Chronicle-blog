import { Link } from 'react-router-dom';
import './index.css';

import {
  houseSVG,
  infoSVG,
  contactSVG,
  authorizationSVG,
  createArticleSVG,
  logOutSVG
} from '../SvgSprite';

function Header({ setIsShowForm }) {
  const isAuthorized = false;

  return (
    <header>
      <a href="/" className="header__logo">
        <img src="img/logo/dub.png" width={105} height={45} alt="logo" />
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
            <p>Про блог</p>{' '}
          </div>
        </Link>
        <Link to={'/contacts'}>
          <div className="header__contacts">
            {contactSVG}
            <p>Контакти</p>{' '}
          </div>
        </Link>
      </div>
      <div className="header__user">
        {isAuthorized ? (
          <button className="header__authorization" onClick={setIsShowForm}>
            {authorizationSVG}
            <p>Авторизація</p>
          </button>
        ) : (
          <div className="header__authorizedUserButtons">
            <Link to={'/createarticle'}>
              <button className="header__createArticle">
                {createArticleSVG}
                <p>Нова стаття</p>
              </button>
            </Link>
            <button className="header__logOut">
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
