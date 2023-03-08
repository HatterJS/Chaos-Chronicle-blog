import { Link } from 'react-router-dom';
import { authorsSVG, newArticleSVG, recomendationSVG } from '../SvgSprite';
import './index.css';

function Navbar() {
  return (
    <nav>
      <div className="nav__menu unselectable">
        <Link to={'/createdAt'}>{newArticleSVG}Нові статті</Link>
        <Link to={'/viewsCount'}>{recomendationSVG}Популярні</Link>
        <Link to={'/authors'}>{authorsSVG}Автори</Link>
      </div>
      <div className="nav__search">
        <input type="search" placeholder="Пошук" />
      </div>
    </nav>
  );
}

export default Navbar;
