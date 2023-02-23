import ArticleItem from '../../components/ArticleItem';
import Sidebar from '../../components/Sidebar';

import './index.css';

function Home() {
  return (
    <div className="home">
      <div className="home__articles">
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
