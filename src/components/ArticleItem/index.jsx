import AuthorSign from '../AuthorSign';
import './index.css';

import { viewsSVG } from '../SvgSprite';

function ArticleItem() {
  return (
    <div className="article">
      <div className="article__image">
        <div className="article__title">
          <h2>Title of article</h2>
          <p>24 лютого 2022</p>
        </div>
        <img src="img/article/Welcome-to-Ukraine-by-Stanislav-Lunin-scaled.jpg" alt="article-img" />
      </div>
      <div className="article__description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
          excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
          ducimus, amet tenetur obcaecati odio quae vel!
        </p>
        <AuthorSign />
        <div className="article__tags">
          <a href="/">#Укравїна</a>
          <a href="/">#Війна</a>
          <a href="/">#Особистаісторія</a>
        </div>
        <div className="article__views unselectable">
          {viewsSVG}
          123
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
