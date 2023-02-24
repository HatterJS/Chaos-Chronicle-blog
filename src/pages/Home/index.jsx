import { Link } from 'react-router-dom';
import ArticleItem from '../../components/ArticleItem';
import Sidebar from '../../components/Sidebar';

import './index.css';

function Home() {
  return (
    <div className="home">
      <div className="home__title">
        <div></div>
        <h1>Нові статті</h1>
        <div></div>
      </div>
      <div className="home__body">
        <div className="home__articles">
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
          <Link to={'/article'}>
            <ArticleItem />
          </Link>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
