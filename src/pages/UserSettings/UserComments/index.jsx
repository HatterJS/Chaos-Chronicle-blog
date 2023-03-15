import React from 'react';
import axios from '../../../axios.js';
import { Link } from 'react-router-dom';

import AuthorSign from '../../../components/AuthorSign/index.jsx';

import { formingDate } from '../../../formingDate.js';
import './index.css';
import { likeSVG } from '../../../components/SvgSprite.js';

function UserComments() {
  //my comments
  const [myComments, setMyComments] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/mycomments')
      .then((res) => setMyComments(res.data))
      .catch((err) => alert(err.response.data.message));
  }, []);
  return (
    <div className="userComments">
      {myComments ? (
        myComments.map((item) => (
          <Link
            to={`/article/${item.articleId._id}`}
            className="userComments__item unselectable"
            key={item._id}>
            <div className="userComments__date">{formingDate(item.createdAt)}</div>
            <h3>{item.articleId.title}</h3>
            <em>{item.text}</em>
            <div className="userComments__likes">
              {likeSVG}
              {item.usersLiked.length}
            </div>
          </Link>
        ))
      ) : (
        <div>12354</div>
      )}
    </div>
  );
}

export default UserComments;
