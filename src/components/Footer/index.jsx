import './index.css';

import { instagramSVG, telegramSVG, faceBookSVG } from '../SvgSprite';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__about unselectable">
          <ul>
            <h3>Defence of Ukraine blog</h3>
            <li>Про нас</li>
            <li>Текст</li>
            <li>Текст</li>
          </ul>
        </div>
        <div className="footer__legal unselectable">
          <ul>
            <h3>Юридична інформація</h3>
            <li>Публічна оферта</li>
            <li>Політика конфіденційності</li>
          </ul>
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
            {instagramSVG}
            {telegramSVG}
            {faceBookSVG}
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
