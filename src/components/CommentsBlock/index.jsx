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
  //textarea value
  const [text, setText] = React.useState('');
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
    <div className='commentsBlock'>
      <div className='commentsBlock__title'>
        <h3>Коментарі:</h3>
        <div></div>
      </div>
      {!isAuthorized ? (
        <div className={'commentsBlock__notAuth'}>
          Читати та додавати коментарі можуть тільки авторизовані користувачі.
        </div>
      ) : (
        <div className='commentsBlock__body'>
          {comments.map((item) => (
            <CommentItem
              key={item._id}
              articleId={id}
              id={item._id}
              text={item.text}
              author={item.author}
              createdAt={item.createdAt}
              usersLiked={item.usersLiked}
            />
          ))}
          <div className='commentsBlock__input'>
            <textarea
              placeholder='Написати коментар'
              maxLength={500}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button onClick={sendComment}>{sendSVG}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsBlock;
