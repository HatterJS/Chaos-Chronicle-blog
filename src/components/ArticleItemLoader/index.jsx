import './index.css';

function ArticleItemLoader() {
  return (
    <div className="articleItemLoader">
      <div className="articleItemLoader__image">
        <div className="articleItemLoader__title">
          <div className="articleItemLoader__textBox"></div>
          <div className="articleItemLoader__textBox"></div>
        </div>
      </div>
      <div className="articleItemLoader__description">
        <div className="articleItemLoader__body">
          <div className="articleItemLoader__textBox"></div>
          <div className="articleItemLoader__textBox"></div>
          <div className="articleItemLoader__textBox"></div>
        </div>
        <div className="articleItemLoader__footer">
          <div className="articleItemLoader__textBox"></div>
          <div className="articleItemLoader__textBox"></div>
        </div>
      </div>
      <div className="articleItemLoader__animation"></div>
    </div>
  );
}

export default ArticleItemLoader;
