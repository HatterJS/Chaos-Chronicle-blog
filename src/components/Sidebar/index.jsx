import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthorSign from '../AuthorSign';

import { fetchLastComments } from '../../redux/slices/comments';
import { setSearch } from '../../redux/slices/articles';

import './index.css';

function Sidebar({ tags }) {
  //dispatch for redux
  const dispatch = useDispatch();
  //lsat comments from redux
  const { lastComments } = useSelector((state) => state.comments);

  React.useEffect(() => {
    dispatch(fetchLastComments(5));
  }, [dispatch]);
  return (
    <aside>
      <div className="aside__tagsBlock">
        <h3>Популярні теги</h3>
        <div className="aside__tags">
          {tags.map((tag) => (
            <div key={tag} onClick={() => dispatch(setSearch(tag))}>
              #{tag}
            </div>
          ))}
        </div>
      </div>
      {lastComments && (
        <div className="aside__commentsBlock unselectable">
          <h3>Останні коментарі</h3>
          {lastComments.map((item) => (
            <Link to={`/article/${item.articleId}`} key={item._id}>
              <div className="aside__commentItem">
                <AuthorSign author={item.author} />
                <div className="aside__commentText">{item.text}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
