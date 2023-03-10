import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../redux/slices/comments';

import CommentItem from '../CommentItem';

import { sendSVG } from '../SvgSprite';
import './index.css';

function CommentsBlock() {
  //dispatch for redux
  const dispatch = useDispatch();
  //article comments
  const { comments, status } = useSelector((state) => state.comments);
  //get article id
  const { id } = useParams();
  //comment text
  const [text, setText] = React.useState('');
  //send comment
  async function sendComment() {
    setText('');
  }
  //get article comments
  React.useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);

  return (
    <div className="commentsBlock">
      <div className="commentsBlock__title">
        <h4>Коментарі:</h4>
        <div></div>
      </div>
      <div className="commentsBlock__body">
        {comments.map((item) => (
          <CommentItem
            key={item._id}
            id={item._id}
            text={item.text}
            author={item.author}
            createdAt={item.createdAt}
            usersLiked={item.usersLiked}
          />
        ))}
        <div className="commentsBlock__input">
          <textarea
            placeholder="Написати коментар"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className="acceptButton" onClick={sendComment} disabled={text.length < 10}>
            {sendSVG}Відправити
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsBlock;
