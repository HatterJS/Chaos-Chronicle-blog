import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import AuthorsItem from '../../components/AuthorsItem';
import AuthorItemLoader from '../../components/AuthorItemLoader';

import { fetchAuthors } from '../../redux/slices/authors';
import './index.css';

function Authors() {
  //dispatch for redux
  const dispatch = useDispatch();
  //authors
  const { authors, status } = useSelector((state) => state.authors);

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <div className="authors">
      <PageTitle title={'Активні користувачі'} />
      <div className="authors__content">
        {status === 'loaded'
          ? authors.map((item) => (
              <Link
                to={`/authorarticles/${item._id}`}
                key={item._id}
                className={item.userArticles === 0 ? 'disabled_link' : undefined}>
                <AuthorsItem
                  userId={item._id}
                  avatarUrl={item.avatarUrl}
                  fullName={item.fullName}
                  status={item.status}
                  rating={item.rating}
                  userArticles={item.userArticles}
                  userComments={item.userComments}
                />
              </Link>
            ))
          : [...Array(6)].map((item, index) => (
              <Link key={index}>
                <AuthorItemLoader />
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Authors;
