import AuthorSign from '../../components/AuthorSign';
import './index.css';

import { viewsSVG } from '../../components/SvgSprite';

function Article() {
  return (
    <article>
      <div className="article">
        <div className="article__titleBlocl">
          <h2>Title of article</h2>
          <p>24 лютого 2022</p>
        </div>
        <div className="article__body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
            excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
            ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Eligendi consequuntur dicta excepturi fuga, nihil pariatur accusamus
            possimus maxime libero non earum commodi sint ducimus, amet tenetur obcaecati odio quae
            vel! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur
            dicta excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi
            sint ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Eligendi consequuntur dicta excepturi fuga, nihil pariatur
            accusamus possimus maxime libero non earum commodi sint ducimus, amet tenetur obcaecati
            odio quae vel!
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
      <div className="comments"></div>
    </article>
  );
}

export default Article;
