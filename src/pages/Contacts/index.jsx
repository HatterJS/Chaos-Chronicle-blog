import PageTitle from '../../components/PageTitle';

import './index.css';

function Contacts() {
  return (
    <div className="contacts">
      <PageTitle title="Контакти" />
      <div className="contacts__content">
        <p>Долучайтесь до нашої спільноти в Telegram:</p>
        <div className="contacts__telegram unselectable">
          <a href="https://t.me/ChaosChroniclesBlog" target={'_blank'} rel="noreferrer">
            <img src="/img/logo/channel_QR.jpg" alt="telegram" width={150} height={150} />
            <div className="constacts__describe">
              <h2>Спільнота в Telegram</h2>
              <h3>Долучайтесь, щоб:</h3>
              <ul>
                <li>першим дізнаватись про нові статті</li>
                <li>ставити запитання авторам статей</li>
                <li>спілкуватись з іншими читачами</li>
              </ul>
            </div>
          </a>
        </div>
        <br />
        <p>Якщо виникли питання або потрібна додаткова інформація, будь ласка, звертайтесь:</p>
        <div className="contacts__telegram unselectable">
          <a href="https://t.me/chaosChronicle_bot" target={'_blank'} rel="noreferrer">
            <img src="/img/logo/assistant_QR.jpg" alt="telegram" width={150} height={150} />
            <div className="constacts__describe">
              <h2>Технічна підтримка</h2>
              <h3>Звертайтесь, якщо:</h3>
              <ul>
                <li>виникли технічні проблеми</li>
                <li>маєте цікаві пропозиції</li>
                <li>бажаєте долучитись до нашої команди</li>
              </ul>
            </div>
          </a>
        </div>
        <p>
          Ми розуміємо, що ваш час дуже цінний, тому зробимо все можливе, щоб якнайшвидше та
          якнайбільш ефективно відповісти на Ваші запитання.
        </p>
        <br />
        <p>
          Дякуємо за використання нашого сервісу і сподіваємося на продуктивну співпрацю з Вами!
        </p>
      </div>
    </div>
  );
}

export default Contacts;
