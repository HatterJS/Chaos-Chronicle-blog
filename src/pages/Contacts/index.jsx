import './index.css';
import { faceBookSVG, instagramSVG, telegramSVG } from '../../components/SvgSprite';

function Contacts() {
  return (
    <div className="contacts">
      <div className="contacts__title">
        <div></div>
        <h1>Контакти</h1>
        <div></div>
      </div>
      <div className="contacts__content">
        Зв'язатись з нами можна будь-яким зручним для вас способом:
        <h2>Телефони:</h2>
        <ul>
          <li>+38 (067) 123-45-67</li>
          <li>+38 (066) 765-43-21</li>
        </ul>
        <h2>Соціальні мережі:</h2>
        <ul className="contacts__social">
          <li>
            <a href="https://www.facebook.com" target={'_blank'} rel="noreferrer">
              {faceBookSVG}
            </a>
          </li>
          <li>
            <a href="https://web.telegram.org" target={'_blank'} rel="noreferrer">
              {telegramSVG}
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target={'_blank'} rel="noreferrer">
              {instagramSVG}
            </a>
          </li>
        </ul>
        <p>
          Якщо виникли питання або потрібна додаткова інформація, будь ласка, зверніться до нас за
          телефонами або через соціальні мережі. Наші спеціалісти з радістю допоможуть вам.
        </p>
      </div>
    </div>
  );
}

export default Contacts;
