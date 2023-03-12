import PageTitle from '../../components/PageTitle';
import './index.css';

function Sponsorship() {
  return (
    <div className="sponsorship">
      <PageTitle title="Стати спонсором" />
      <div className="sponsorship__content">
        <p>
          Шановні користувачі та читачі блогу <strong>"Defense of Ukraine"!</strong>
        </p>
        <p>
          Ми з радістю повідомляємо вам про можливість <strong>стати спонсором</strong> нашого блогу
          та допомогти Збройним Силам України у боротьбі з агресором. Ваша підтримка може допомогти
          нашим військам у важких умовах на передовій, забезпечити їх необхідними ресурсами та
          врятувати життя українських захисників.
        </p>
        <p>
          Спонсорство може мати різні форми та обсяги, починаючи від невеликих пожертв до значних
          благодійних внесків.{' '}
          <strong>Всі ваші пожертви будуть направлені на потреби Збройних Сил України</strong>
          та спрямовані на забезпечення їхньої ефективної роботи в умовах бойових дій.
        </p>
        <p>
          Якщо ви бажаєте стати спонсором блогу <strong>"Defense of Ukraine"</strong> та допомогти
          Збройним Силам України у боротьбі з агресором, будь ласка, зв'яжіться з нами за наступними
          контактами:
        </p>
        <div className="sponsorship__links">
          <p>
            Електронна пошта:{' '}
            <strong>
              <a href="mailto:defenseofukraine@gmail.com" target={'_new'}>
                xxxxxxxxx@gmail.com
              </a>
            </strong>
          </p>
          <p>
            Телефон: <strong>+380 XX XXX XX XX</strong>
          </p>
        </div>
        <p>Ми будемо вдячні за вашу підтримку та сподіваємось на продуктивну співпрацю!</p>
      </div>
    </div>
  );
}

export default Sponsorship;
