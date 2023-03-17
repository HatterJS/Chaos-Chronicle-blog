import React from 'react';
import axios from '../../axios.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { commentsSVG, createArticleSVG, ratingSVG } from '../SvgSprite';
import './index.css';

function AuthorsItem({ userId, avatarUrl, fullName, status, rating, userArticles, userComments }) {
  //current user data
  const { userData } = useSelector((state) => state.authorization);
  //user promotion
  const [promotion, setPromotion] = React.useState(status);

  //users status array for promote
  const userStatusArr = ['Читач', 'Автор', 'Редактор'];
  //admin user status
  const adminStatusArr = ['Головний редактор', 'Редактор'];

  function isPromotional() {
    return userData && adminStatusArr.includes(userData.status) && status !== 'Головний редактор';
  }

  function promoteUser(event) {
    if (
      window.confirm(
        `Ви бажаєте змінити статус користувача ${fullName} на "${event.target.value}"?`
      )
    ) {
      axios
        .patch('/promotion', { userId, status: event.target.value })
        .then((res) => {
          setPromotion(res.data.status);
          alert(res.data.message);
        })
        .catch((err) => alert(err.response.data.message));
    }
  }
  return (
    <div className="authorItem unselectable">
      <Link
        to={`/authorarticles/${userId}`}
        className={userArticles === 0 ? 'disabled_link' : undefined}>
        <div className={`authorItem__item${isPromotional() ? ' authorItem__options' : ''}`}>
          <div className="authorItem__avatar">
            <img src={avatarUrl} alt="avatar" />
          </div>
          <div className="authorItem__info">
            <h3>{fullName}</h3>
            <p>{promotion}</p>
            <div className="authorItem__statistics">
              <div title="Рейтинг">
                {ratingSVG}
                {rating}
              </div>
              <div title="Опубліковано статей">
                {createArticleSVG}
                {userArticles}
              </div>
              <div title="Додано коментарів">
                {commentsSVG}
                {userComments}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {isPromotional() && (
        <div className="authorItem__promotion">
          <select name="promotion" id="promotion" value={promotion} onChange={promoteUser}>
            {userStatusArr.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default AuthorsItem;
