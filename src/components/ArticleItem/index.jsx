import './index.css';

function ArticleItem() {
  return (
    <div className="article">
      <div className="article__image">
        <img src="img/article/Welcome-to-Ukraine-by-Stanislav-Lunin-scaled.jpg" alt="article-img" />
      </div>
      <div className="article__description">
        <h2>Title of article</h2>
        <div className="article__date">
          <p>24 лютого 2022</p>
          <a href="/">(Автор)</a>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
          excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
          ducimus, amet tenetur obcaecati odio quae vel!
        </p>
        <div className="article__tags">
          <a href="/">#Укравїна</a>
          <a href="/">#Війна</a>
          <a href="/">#Особистаісторія</a>
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
