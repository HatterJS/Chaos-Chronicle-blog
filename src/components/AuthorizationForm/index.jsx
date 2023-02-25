import { Link } from 'react-router-dom';
import { faceBookSVG, googleSVG, instagramSVG } from '../SvgSprite';
import './index.css';

function AuthorizationForm({ isShowForm, setIsShowForm }) {
  return (
    <div className={isShowForm ? 'authorizationForm show' : 'authorizationForm hint'}>
      <div className="authorizationForm__shadow" onClick={setIsShowForm}></div>
      <div className="authorizationForm__form">
        <div className="authorizationForm__header">
          <h2>Авторизація</h2>
        </div>
        <div className="authorizationForm__body">
          <h4>E-mail:</h4>
          <input type="email" />
          <h4>Пароль:</h4>
          <input type="password" />
          <div className="authorizationForm__buttons">
            <button className="acceptButton">Вхід</button>
            <button className="cancelButton" onClick={setIsShowForm}>
              Відхилити
            </button>
          </div>
          <div className="authorizationForm__registration">
            <p>Відсутній акаунт?</p>
            <Link to="/registration" onClick={setIsShowForm}>
              Реєстрація.
            </Link>
          </div>
          <div className="authorizationForm__social">
            {googleSVG}
            {faceBookSVG}
            {instagramSVG}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationForm;
