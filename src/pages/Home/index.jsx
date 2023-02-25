import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticleItem from '../../components/ArticleItem';
import ArticleItemLoader from '../../components/ArticleItemLoader';
import Sidebar from '../../components/Sidebar';

import { fetchArticles } from '../../redux/slices/articles';

import './index.css';

function Home() {
  //create dispatch for redux
  const dispatch = useDispatch();
  //get articles and tags from redux
  const { articles, tags } = useSelector((state) => state.articles);
  console.log(articles.items);
  //async request to the backend to getting all articles (redux articlesSlice)
  React.useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__title">
        <div></div>
        <h1>Нові статті</h1>
        <div></div>
      </div>
      <div className="home__body">
        <div className="home__articles">
          {articles.status === 'loaded'
            ? articles.items.map((item) => (
                <Link to={'/article'} key={item._id}>
                  <ArticleItem
                    title={item.title}
                    fullDate={item.createdAt}
                    text={item.text.slice(0, 20)}
                    tags={item.tags}
                    views={item.viewsCount}
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
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
