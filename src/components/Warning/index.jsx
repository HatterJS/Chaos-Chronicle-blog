import { warningSVG } from '../SvgSprite';
import './index.css';

function Warning() {
  return (
    <div className="warning">
      <p>
        {warningSVG}
        УВАГА! На Ваш E-mail надіслано лист для активації облікового запису. Наразі Вам не доступні
        деякі фунції сайту.
      </p>
    </div>
  );
}

export default Warning;
