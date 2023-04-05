import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import ArticleItem from '../../components/ArticleItem';
import ArticleItemLoader from '../../components/ArticleItemLoader';
import Sidebar from '../../components/Sidebar';
import PageTitle from '../../components/PageTitle';
import Banner from '../../components/Banner';

import { fetchArticles, fetchTags } from '../../redux/slices/articles';

import './index.css';
import PageSwitcher from '../../components/PageSwitcher';

function Home() {
  //create dispatch for redux
  const dispatch = useDispatch();
  //get articles and tags from redux
  const { articles, tags, filter } = useSelector((state) => state.articles);
  const { page, perPage } = articles.pagination;
  //async request to the backend to getting all articles (redux articlesSlice)
  React.useEffect(() => {
    dispatch(fetchArticles({ sort: filter.sort, search: filter.search, page, perPage }));
    dispatch(fetchTags());
  }, [dispatch, filter, page, perPage]);
  return (
    <div className="home">
      <Banner />
      <Navbar />
      <PageTitle title={'Cтатті'} />
      <div className="home__body">
        <div className="home__articleBlock">
          <div className="home__articles">
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
                [...Array(7)].map((item, index) => (
                  <Link key={index}>
                    <ArticleItemLoader />
                  </Link>
                ))}
          </div>
          <PageSwitcher />
        </div>
        <Sidebar tags={tags.items} />
      </div>
    </div>
  );
}

export default Home;
