import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import { commentsSVG, createArticleSVG, ratingSVG } from '../../components/SvgSprite';

import { fetchAuthors } from '../../redux/slices/authors';
import './index.css';

function Authors() {
  //dispatch for redux
  const dispatch = useDispatch();
  //authors
  const { authors, status } = useSelector((state) => state.authors);

  //users status array for promote

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <div className="authors">
      <PageTitle title={'Активні користувачі'} />
      <div className="authors__content">
        {status === 'loaded' ? (
          authors.map((item) => (
            <div className="author__item unselectable" key={item._id}>
              <div className="author__avatar">
                <img src={item.avatarUrl} alt="avatar" />
              </div>
              <div className="author__info">
                <h3>{item.fullName}</h3>
                <p>{item.status}</p>
                <div className="authors__statistics">
                  <div title="опубліковано статей">
                    {createArticleSVG}
                    {item.userArticles}
                  </div>
                  <div title="додано коментарів">
                    {commentsSVG}
                    {item.userComments}
                  </div>
                  <div title="рейтинг">
                    {ratingSVG}
                    {item.rating}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="author__loader">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Authors;
