import { Link } from 'react-router-dom';
import './index.css';

import { houseSVG, infoSVG, contactSVG, authorizationSVG } from '../SvgSprite';

function Header({ setIsShowForm }) {
  return (
    <header>
      <a href="/" className="header__logo">
        <img src="img/logo/dub.png" width={105} height={45} alt="logo" />
      </a>
      <div className="header__links">
        <Link to={'/'}>
          <div className="header__home">{houseSVG}Головна</div>
        </Link>
        <Link to={'/'}>
          <div className="header__about">{infoSVG}Про блог</div>
        </Link>
        <Link to={'/'}>
          <div className="header__contacts">{contactSVG}Контакти</div>
        </Link>
      </div>
      <div className="header__user">
        <button className="header__authorization" onClick={setIsShowForm}>
          {authorizationSVG}
          Авторизація
        </button>
        {/* <button className="header__registration">Реєстрація</button> */}
      </div>
    </header>
  );
}

export default Header;
