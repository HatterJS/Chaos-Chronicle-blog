import React from 'react';
import axios from '../../axios.js';
import { useSelector } from 'react-redux';

import { commentsSVG, createArticleSVG, ratingSVG, sendSVG } from '../SvgSprite';
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

  function promoteUser() {
    if (
      window.confirm(
        `Ви бажаєте змінити статус користувача ${fullName} з "${status}" на "${promotion}"?`
      )
    ) {
      axios
        .patch('/promotion', { userId, status: promotion })
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err.response.data.message));
    }
  }
  return (
    <div className="authorItem unselectable">
      <div className="authorItem__avatar">
        <img src={avatarUrl} alt="avatar" />
      </div>
      <div className="authorItem__info">
        <h3>{fullName}</h3>
        <p>{status}</p>
        <div className="authorItem__statistics">
          <div title="рейтинг">
            {ratingSVG}
            {rating}
          </div>
          <div title="опубліковано статей">
            {createArticleSVG}
            {userArticles}
          </div>
          <div title="додано коментарів">
            {commentsSVG}
            {userComments}
          </div>
        </div>
        {userData && adminStatusArr.includes(userData.status) && status !== 'Головний редактор' && (
          <div className="authorItem__promotion">
            <select
              name="promotion"
              id="promotion"
              value={promotion}
              onChange={(event) => setPromotion(event.target.value)}>
              {userStatusArr.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button className="acceptButton" onClick={promoteUser}>
              {sendSVG}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorsItem;
