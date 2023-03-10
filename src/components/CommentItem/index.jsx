import React from 'react';
import axios from '../../axios.js';
import { useSelector } from 'react-redux';

import AuthorSign from '../AuthorSign';

import { formingDate } from '../../formingDate';
import { likedSVG, likeSVG } from '../SvgSprite';
import './index.css';

function CommentItem({ id, text, author, createdAt, usersLiked }) {
  //current user id from redux
  const { _id: currentUser } = useSelector((state) => state.authorization.userData);
  //users who liked
  const [likes, setLikes] = React.useState(usersLiked);
  //on click like btn
  function onClickLike() {
    axios
      .get(`/likecomment/${id}`)
      .then((res) => setLikes(res.data))
      .catch((err) => {
        console.log(err);
        alert('Не вдалось лайкнути коментар');
      });
  }
  return (
    <div className="commentItem unselectable">
      <AuthorSign authorName={author.fullName} avatarUrl={author.avatarUrl} />
      <div className="commentItem__block">
        <div className="commentItem__time">{formingDate(createdAt)}</div>
        <p>{text}</p>
        <div className="commentItem__likes" onClick={onClickLike}>
          {likes.includes(currentUser) ? likedSVG : likeSVG} {likes.length}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
