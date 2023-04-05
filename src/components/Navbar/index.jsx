import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSearch, setSort } from '../../redux/slices/articles';
import { authorsSVG, closeSVG, lensSVG, newArticleSVG, recomendationSVG } from '../SvgSprite';
import './index.css';

function Navbar() {
  //dispatch for redux
  const dispatch = useDispatch();
  //search value from redux
  const { search } = useSelector((state) => state.articles.filter);
  //search value
  const [searchValue, setSearchValue] = React.useState('');
  //on press Enter in search field
  function handleSearchKey(event) {
    event.key === 'Enter' && dispatch(setSearch(searchValue));
  }
  //handle search button
  function handleSearchBtn() {
    dispatch(setSearch(searchValue));
  }
  //handle changes in search field
  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchValue(value);
    !value && dispatch(setSearch(''));
  }
  //clear search
  function clearSearch() {
    setSearchValue('');
    dispatch(setSearch(''));
  }
  React.useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <nav>
      <div className="nav__menu unselectable">
        <ul>
          <li onClick={() => dispatch(setSort('createdAt'))}>{newArticleSVG}Нові статті</li>
          <li onClick={() => dispatch(setSort('viewsCount'))}>{recomendationSVG}Популярні</li>
          <li>
            <Link to={'/authors'}>{authorsSVG}Автори</Link>
          </li>
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
        <button onClick={handleSearchBtn}>{lensSVG}</button>
      </div>
      {searchValue && (
        <div className="nav__searchWarning unselectable">
          <button onClick={clearSearch}>{closeSVG}</button>
          {searchValue}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
