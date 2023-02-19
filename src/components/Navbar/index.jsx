import { authorsSVG, newArticleSVG, recomendationSVG } from '../SvgSprite';
import './index.css';

function Navbar() {
  return (
    <nav>
      <ul className="nav__menu unselectable">
        <li>
          {newArticleSVG}
          <a href="/">Нові статті</a>
        </li>
        <li>
          {recomendationSVG}
          <a href="/">Рекомендації</a>
        </li>
        <li>
          {authorsSVG}
          <a href="/">Автори</a>
        </li>
      </ul>
      <div className="nav__search">
        <input type="search" placeholder="Пошук" />
      </div>
    </nav>
  );
}

export default Navbar;
