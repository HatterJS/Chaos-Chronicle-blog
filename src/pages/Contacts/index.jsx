import PageTitle from '../../components/PageTitle';

import './index.css';

function Contacts() {
  return (
    <div className="contacts">
      <PageTitle title="Контакти" />
      <div className="contacts__content">
        <p>Задати будь-яке питання можна у спільноті Telegram:</p>
        <div className="constacts__telegram unselectable">
          <a href="https://t.me/ChaosChroniclesBlog" target={'_blank'} rel="noreferrer">
            <img src="/img/logo/telegram.jpg" alt="telegram" width={200} height={200} />
            <div className="constacts__describe">
              <h2>CHAOS CHRONICLES BLOG</h2>
              <h3>Долучайся щоб:</h3>
              <ul>
                <li>отримувати інформацію про нові статті</li>
                <li>обговорювати актуальні теми</li>
                <li>ставити запитання та отримувати відповіді</li>
              </ul>
            </div>
          </a>
        </div>
        <p>Якщо виникли питання або потрібна додаткова інформація, будь ласка, звертайтесь.</p>
        <p>Наші спеціалісти будуть раді допомогти Вам.</p>
      </div>
    </div>
  );
}

export default Contacts;
