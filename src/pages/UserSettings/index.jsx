import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import Settings from './Settings';
import UserArticles from './UserArticles';
import UserComments from './UserComments';

import './index.css';

import { isAuthCheck, logOut } from '../../redux/slices/authorization';
import {
  commentsSVG,
  createArticleSVG,
  logOutSVG,
  userSettingSVG
} from '../../components/SvgSprite';

function UserSettings() {
  //dispatch for redux
  const dispatch = useDispatch();
  //is authorized user
  const isAuthorized = useSelector(isAuthCheck);

  function handleLogOut() {
    if (window.confirm('Ви дійсно бажаєте вийти?')) {
      dispatch(logOut());
      localStorage.removeItem('token');
    }
  }

  if (!isAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="userSettings">
      <PageTitle title={'Особистий кабінет'} />
      <div className="userSettings__body">
        <div className="userSettings__nav">
          <Link to={'/usersettings/settings'}>
            <button className="cancelButton">
              {userSettingSVG}
              <p>Налаштування</p>
            </button>
          </Link>
          <Link to={'/usersettings/articles'}>
            <button className="cancelButton">
              {createArticleSVG}
              <p>Статті</p>
            </button>
          </Link>
          <Link to={'/usersettings/comments'}>
            <button className="cancelButton">
              {commentsSVG}
              <p>Коментарі</p>
            </button>
          </Link>
          <button className="cancelButton" onClick={handleLogOut}>
            {logOutSVG}
            <p>Вийти</p>
          </button>
        </div>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/articles" element={<UserArticles />} />
          <Route path="/comments" element={<UserComments />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserSettings;
