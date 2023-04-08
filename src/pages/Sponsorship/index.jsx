import PageTitle from "../../components/PageTitle";
import "./index.css";

function Sponsorship() {
  return (
    <div className="sponsorship">
      <PageTitle title="Стати спонсором" />
      <div className="sponsorship__content">
        <p>
          Шановні користувачі та читачі блогу <strong>Chaos Cronicles!</strong>
        </p>
        <p>
          Наша редакція постійно працюємо над тим, щоб стати кращими та надавати
          нашим читачам цікаву та актуальну інформацію. І хоча ми сповнені
          інтузіазму, без підтримки спонсорів дуже важко розвивати та
          вдосконалювати роботу блогу. Тому ми шукаємо людей та компанії, які
          хочуть підтримати наші зусилля та <strong>стати спонсорами</strong>.
        </p>
        <p>
          Спонсорство може мати різні форми та обсяги, починаючи від допомоги в
          створенні контенту до постійної фінансової підтримки.
        </p>
        <p>
          В цей важкий час ми поважаємо підтримку нашої армії та військових, які
          захищають нашу країну. Тому значна частина коштів, які ми отримаємо
          від наших спонсорів, будуть передані на підтримку Збройних Сил
          України.
        </p>
        <p>
          Тож якщо ви хочете долучитися до спонсорства нашого блогу, будь ласка,
          зв'яжіться з нами та дізнайтеся більше про співпрацю. Ми будемо раді
          партнерству з вами!
        </p>
        <div className="sponsorship__links">
          <p>
            Електронна пошта:{" "}
            <strong>
              <a href="mailto:defenseofukraine@gmail.com" target={"_new"}>
                ChaosChroniclesBlog@gmail.com
              </a>
            </strong>
          </p>
        </div>
        <div className="sponsorship__donate">
          <a
            href="https://send.monobank.ua/jar/5fmnUUzLoV"
            target={"_blank"}
            rel="noreferrer"
          >
            <img
              src="/img/donate/donate_blog.jpg"
              alt="blog"
              width={300}
              height={525}
            />
          </a>
          <a
            href="https://send.monobank.ua/jar/2D2z173X3Q"
            target={"_blank"}
            rel="noreferrer"
          >
            <img
              src="/img/donate/donate_zsu.jpg"
              alt="ZSU"
              width={300}
              height={525}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sponsorship;
