import { Link } from 'react-router-dom';
import { authorsSVG, newArticleSVG, recomendationSVG } from '../SvgSprite';
import './index.css';

function Navbar() {
  return (
    <nav>
      <ul className="nav__menu unselectable">
        <li>
          {newArticleSVG}
          <Link to={'/'}>Нові статті</Link>
        </li>
        <li>
          {recomendationSVG}
          <Link to={'/recomend'}>Рекомендації</Link>
        </li>
        <li>
          {authorsSVG}
          <Link to={'/authors'}>Автори</Link>
        </li>
      </ul>
      <div className="nav__search">
        <input type="search" placeholder="Пошук" />
      </div>
    </nav>
  );
}

export default Navbar;
