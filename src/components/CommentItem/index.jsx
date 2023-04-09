import React from 'react';
import axios from '../../axios.js';
import { useDispatch, useSelector } from 'react-redux';

import AuthorSign from '../AuthorSign';

import { removeComment } from '../../redux/slices/comments.js';
import {
  fetchAddAnswer,
  fetchAnswers,
  removeAnswer,
} from '../../redux/slices/answers.js';
import { formingDate } from '../../formingDate';
import { deleteSVG, likedSVG, likeSVG, sendSVG } from '../SvgSprite';

import './index.css';

function CommentItem({ articleId, id, text, author, createdAt, usersLiked }) {
  //dispatch for redux
  const dispatch = useDispatch();
  //current user id from redux
  const { _id: currentUser } =
    useSelector((state) => state.authorization.userData) || 'notAuthorized';
  //users who liked
  const [likes, setLikes] = React.useState(usersLiked);
  //textarea value
  const [answerText, setAnswerText] = React.useState('');
  const [isShowAnswer, setIsShowAnswer] = React.useState(false);
  //answers
  const { answers } = useSelector((state) => state.answers);
  //send answer
  async function sendAnswer() {
    dispatch(fetchAddAnswer({ commentId: id, text: answerText }));
    setAnswerText('');
    setIsShowAnswer(false);
  }
  //on click like btn
  function likeComment() {
    axios
      .get(`/likecomment/${id}`)
      .then((res) => setLikes(res.data))
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
  //delete the comment
  async function deleteComment() {
    axios
      .delete(`/comment/${id}`)
      .then(dispatch(removeComment(id)))
      .catch((err) => console.log(err));
  }
  // delete the answer
  async function deleteAnswer(answerId) {
    axios
      .delete(`/answer/${answerId}`)
      .then(dispatch(removeAnswer({ commentId: id, answerId })))
      .catch((err) => console.log(err));
  }
  //get comment answers
  React.useEffect(() => {
    dispatch(fetchAnswers(id));
  }, [id, dispatch]);

  return (
    <div className='commentItem unselectable'>
      <div className='commentItem__mainComment'>
        <div className='commentItem__mainBlock'>
          <AuthorSign author={author} />
          <div className='commentItem__block'>
            <div className='commentItem__time'>{formingDate(createdAt)}</div>
            <p>{text}</p>
            <div className='commentItem__footer'>
              <button onClick={() => setIsShowAnswer(!isShowAnswer)}>
                Відповісти
              </button>
              <div className='commentItem__likes' onClick={likeComment}>
                {likes.includes(currentUser) ? likedSVG : likeSVG}{' '}
                {likes.length}
              </div>
            </div>
          </div>
        </div>
        <div
          className='commentItem__answerBlock'
          style={{ display: isShowAnswer ? 'flex' : 'none' }}
        >
          <textarea
            placeholder='Написати коментар'
            maxLength={500}
            value={answerText}
            onChange={(event) => setAnswerText(event.target.value)}
          />
          <button onClick={sendAnswer}>{sendSVG}</button>
        </div>
        {currentUser === author._id && (
          <div className='commentItem__delete' onClick={deleteComment}>
            {deleteSVG}
          </div>
        )}
      </div>
      <div className='commentItem__answersBlock'>
        {answers[id] &&
          answers[id].map((item) => (
            <div className='commentItem__mainComment' key={item._id}>
              <div className='commentItem__mainBlock'>
                <AuthorSign author={item.author} />
                <div className='commentItem__block'>
                  <div className='commentItem__time'>
                    {formingDate(item.createdAt)}
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
              {currentUser === item.author._id && (
                <div
                  className='commentItem__delete'
                  onClick={() => deleteAnswer(item._id)}
                >
                  {deleteSVG}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentItem;
