import AuthorSign from '../../components/AuthorSign';
import './index.css';

import { deleteSVG, penSVG, viewsSVG } from '../../components/SvgSprite';
import CommentItem from '../../components/CommentItem';

function Article() {
  return (
    <article>
      <div className="article__content">
        <div className="article__author">
          <div className="article__authorLine"></div>
          <AuthorSign />
          <div className="article__authorLine"></div>
        </div>
        <div className="article__header">
          <div className="article__titleBlock">
            <h1>Title of article</h1>
            <p>24 лютого 2022</p>
          </div>
          <div className="article__toolsBlock">
            <button>{penSVG}</button>
            <button>{deleteSVG}</button>
          </div>
        </div>
        <div className="article__body">
          <div className="article__image">
            <img
              src="img/article/Welcome-to-Ukraine-by-Stanislav-Lunin-scaled.jpg"
              alt="article-img"
            />
          </div>
          <p>
            Eligendi consequuntur dicta excepturi fuga, nihil pariatur accusamus possimus maxime
            libero non earum commodi sint ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta excepturi
            fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint ducimus,
            amet tenetur obcaecati odio quae vel!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
            excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
            ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
            excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
            ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
            excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
            ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
            excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
            ducimus, amet tenetur obcaecati odio quae vel! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p>
            Eligendi consequuntur dicta excepturi fuga, nihil pariatur accusamus possimus maxime
            libero non earum commodi sint ducimus, amet tenetur obcaecati odio quae vel!
          </p>
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
      <div className="article__comments">
        <div className="article__commentsTitle">
          <h4>Коментарі:</h4>
          <div></div>
        </div>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </article>
  );
}

export default Article;
