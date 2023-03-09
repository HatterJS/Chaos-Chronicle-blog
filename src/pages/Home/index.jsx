import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import ArticleItem from '../../components/ArticleItem';
import ArticleItemLoader from '../../components/ArticleItemLoader';
import Sidebar from '../../components/Sidebar';

import { fetchArticles, fetchTags } from '../../redux/slices/articles';

import './index.css';

function Home() {
  //create dispatch for redux
  const dispatch = useDispatch();
  //get articles and tags from redux
  const { articles, tags } = useSelector((state) => state.articles);
  //articles sort
  const [sort, setSort] = React.useState('createdAt');
  //search by title and tags
  const [search, setSearch] = React.useState('');
  //async request to the backend to getting all articles (redux articlesSlice)
  React.useEffect(() => {
    dispatch(fetchArticles({ sort, search }));
    dispatch(fetchTags());
  }, [dispatch, sort, search]);
  return (
    <div className="home">
      <Navbar setSort={setSort} setSearch={setSearch} />
      <div className="home__body">
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
                    authorName={item.author.fullName}
                    avatarUrl={item.author.avatarUrl}
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
        <Sidebar tags={tags.items} />
      </div>
    </div>
  );
}

export default Home;
