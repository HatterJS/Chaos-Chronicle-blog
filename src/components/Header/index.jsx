import './index.css';

import { houseSVG, infoSVG, contactSVG, authorizationSVG } from '../SvgSprite';

function Header() {
  return (
    <header>
      <a href="/" className="header__logo">
        <img src="img/logo/dub.png" width={105} height={45} alt="logo" />
      </a>
      <div className="header__links">
        <div className="header__home">
          {houseSVG}
          <a href="/">Головна</a>
        </div>
        <div className="header__about">
          {infoSVG}
          <a href="/">Про блог</a>
        </div>
        <div className="header__contacts">
          {contactSVG}
          <a href="/">Контакти</a>
        </div>
      </div>
      <div className="header__user">
        <button className="header__authorization">
          {authorizationSVG}
          Авторизація
        </button>
        {/* <button className="header__registration">Реєстрація</button> */}
      </div>
    </header>
  );
}

export default Header;
