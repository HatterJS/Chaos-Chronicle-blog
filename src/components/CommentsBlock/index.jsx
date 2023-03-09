import React from 'react';
import { useParams } from 'react-router-dom';

import CommentItem from '../CommentItem';

import { sendSVG } from '../SvgSprite';
import './index.css';

function CommentsBlock() {
  //get article id
  const { id } = useParams();
  //comment text
  const [text, setText] = React.useState('');
  //send comment
  async function sendComment() {
    console.log(id, text);
    setText('');
  }
  //get article comments
  React.useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="commentsBlock">
      <div className="commentsBlock__title">
        <h4>Коментарі:</h4>
        <div></div>
      </div>
      <div className="commentsBlock__body">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
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
