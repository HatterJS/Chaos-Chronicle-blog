import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommentItem from '../CommentItem';

import { isAuthCheck } from '../../redux/slices/authorization';
import { fetchAddComment, fetchComments } from '../../redux/slices/comments';

import { sendSVG } from '../SvgSprite';
import './index.css';

function CommentsBlock() {
  //dispatch for redux
  const dispatch = useDispatch();
  //is authorized user
  const isAuthorized = useSelector(isAuthCheck);
  //article comments
  const { comments } = useSelector((state) => state.comments);
  //get article id
  const { id } = useParams();
  //comment text
  const [text, setText] = React.useState('');
  //handle Enter
  function handleKey(event) {
    console.log(event.key);
    if (text.length > 500 && event.key !== 'Backspace') {
      return alert('Текст коментаря не може перевищувати 500 символів');
    }
    if (event.key === 'Enter') {
      sendComment();
    }
  }
  //send comment
  async function sendComment() {
    dispatch(fetchAddComment({ articleId: id, text }));
    setText('');
  }
  //get article comments
  React.useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);
  return (
    <div className="commentsBlock">
      <div className="commentsBlock__title">
        <h3>Коментарі:</h3>
        <div></div>
      </div>
      {!isAuthorized ? (
        <div className={'commentsBlock__notAuth'}>
          Читати та доадавати коментарі можуть тільки авторизовані користувачі.
        </div>
      ) : (
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
              onKeyUp={handleKey}
            />
            <button className="acceptButton" onClick={sendComment} disabled={text.length > 500}>
              {sendSVG}Відправити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsBlock;
