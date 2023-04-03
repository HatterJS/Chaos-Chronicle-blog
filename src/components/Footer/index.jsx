import { Link } from 'react-router-dom';
import './index.css';

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
          <Link to={'/sponsorship'}>Стати спонсором</Link>
          <Link to={'/privacypolicy'}>Політика конфіденційності</Link>
        </div>
        <div className="footer__socialBlock">
          <div className="footer__social unselectable">
            <h3>Долучайтесь</h3>
            <div className="footer__socialImg">
              <div className="banner__telegram unselectable">
                <a href="https://t.me/ChaosChroniclesBlog" target={'_blank'} rel="noreferrer">
                  <img src="/img/logo/channel_QR.jpg" alt="telegram" width={80} height={80} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer__social unselectable">
            <h3>Звертайтесь</h3>
            <div className="footer__socialImg">
              <div className="banner__telegram unselectable">
                <a href="https://t.me/chaosChronicle_bot" target={'_blank'} rel="noreferrer">
                  <img src="/img/logo/assistant_QR.jpg" alt="telegram" width={80} height={80} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__additional">
        <p>Усi права захищенi ©2023 Defense of Ukraine</p>
        <p>Розроблено mr.Hatter - formarkets.ua@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
