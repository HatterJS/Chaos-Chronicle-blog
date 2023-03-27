import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';

import ArticleItem from '../../components/ArticleItem';
import ArticleItemLoader from '../../components/ArticleItemLoader';
import AuthorSign from '../../components/AuthorSign';
import PageSwitcher from '../../components/PageSwitcher';

import { fetchAuthorArticles } from '../../redux/slices/articles';

import './index.css';

function AuthorArticles() {
  //create dispatch for redux
  const dispatch = useDispatch();
  //author id from url params
  const { id } = useParams();
  //authors from redux
  const { authors } = useSelector((state) => state.authors);
  //get an author by id
  const author = authors.find((item) => item._id === id);
  //get articles and tags from redux
  const { articles } = useSelector((state) => state.articles);
  const { page, perPage } = articles.pagination;
  //async request to the backend to getting all articles (redux articlesSlice)
  React.useEffect(() => {
    dispatch(fetchAuthorArticles({ id, page, perPage }));
  }, [dispatch, id, page, perPage]);
  if (!authors.length) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="authorArticles">
      <div className="authorArticles__author">
        <div className="pageTitle__leftLine"></div>
        <AuthorSign author={author} />
        <div className="pageTitle__rightLine"></div>
      </div>
      <div className="authorArticles__content">
        {articles.status === 'loaded'
          ? articles.items.map((item) => (
              <Link to={`/article/${item._id}`} key={item._id}>
                <ArticleItem
                  title={item.title}
                  fullDate={item.createdAt}
                  imageUrl={item.imageUrl}
                  text={item.text.slice(0, 280) + ' ...'}
                  tags={item.tags}
                  views={item.viewsCount}
                  author={item.author}
                />
              </Link>
            ))
          : //Loader
            [...Array(5)].map((item, index) => (
              <Link key={index}>
                <ArticleItemLoader />
              </Link>
            ))}
      </div>
      <PageSwitcher />
    </div>
  );
}

export default AuthorArticles;
