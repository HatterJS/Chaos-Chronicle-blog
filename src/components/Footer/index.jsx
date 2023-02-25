import { Link } from 'react-router-dom';
import './index.css';

import { instagramSVG, telegramSVG, faceBookSVG } from '../SvgSprite';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__about unselectable">
          <h3>Defence of Ukraine blog</h3>
          <Link to={'/'}>Головна</Link>
          <Link to={'/about'}>Про нас</Link>
          <Link to={'/contacts'}>Контакти</Link>
        </div>
        <div className="footer__legal unselectable">
          <h3>Юридична інформація</h3>
          <Link to={'/publicoffer'}>Публічна оферта</Link>
          <Link to={'/privacypolicy'}>Політика конфіденційності</Link>
        </div>
        <div className="footer__contacts">
          <ul>
            <h3 className=" unselectable">Контакти</h3>
            <li>+38(066)503-34-00</li>
            <li>+38(067)777-34-00</li>
          </ul>
        </div>
        <div className="footer__social unselectable">
          <h3>Приєднуйтесь</h3>
          <div className="footer__socialImg">
            <a href="https://www.instagram.com/" target={'_blank'} rel="noreferrer">
              {instagramSVG}
            </a>
            <a href="https://web.telegram.org/" target={'_blank'} rel="noreferrer">
              {telegramSVG}
            </a>
            <a href="https://www.facebook.com/" target={'_blank'} rel="noreferrer">
              {faceBookSVG}
            </a>
          </div>
        </div>
      </div>
      <div className="footer__additional">
        <p>Усi права захищенi ©2022 Pizza point</p>
        <p>Розроблено mr.Hatter - formarkets.ua@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
