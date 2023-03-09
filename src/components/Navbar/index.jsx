import React from 'react';
import { authorsSVG, newArticleSVG, recomendationSVG } from '../SvgSprite';
import './index.css';

function Navbar({ setSort, setSearch }) {
  //search value
  const [searchValue, setSearchValue] = React.useState('');
  //on press Enter in search field
  function handleSearchKey(event) {
    event.key === 'Enter' && setSearch(searchValue);
  }
  //handle changes in search field
  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchValue(value);
    !value && setSearch('');
  }

  return (
    <nav>
      <div className="nav__menu unselectable">
        <ul>
          <li onClick={() => setSort('createdAt')}>{newArticleSVG}Нові статті</li>
          <li onClick={() => setSort('viewsCount')}>{recomendationSVG}Популярні</li>
          <li>{authorsSVG}Автори</li>
        </ul>
      </div>
      <div className="nav__search">
        <input
          type="search"
          placeholder="Пошук"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyUp={handleSearchKey}
        />
      </div>
    </nav>
  );
}

export default Navbar;
