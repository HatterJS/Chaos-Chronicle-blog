import React from 'react';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthorSign from '../../components/AuthorSign';
import CommentItem from '../../components/CommentItem';

import './index.css';

import { deleteSVG, penSVG, viewsSVG } from '../../components/SvgSprite';
import { formingDate } from '../../formingDate';

function Article() {
  //get authorized user data from redux to determine the rights to correct and delete the article
  const { userData } = useSelector((state) => state.authorization);
  //get params from URL bar
  const { id } = useParams();
  //article object
  const [article, setArticle] = React.useState({});
  //is loading an article state
  const [isLoading, setIsLoading] = React.useState(true);
  //get article from backend
  React.useEffect(() => {
    axios
      .get(`/article/${id}`)
      .then((res) => {
        setArticle(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Нажаль, виникла помилка під час завантаження статті');
      });
  }, [id]);

  function isOwner() {
    if (userData) {
      return article.author._id === userData._id;
    }
    return false;
  }
  return isLoading ? (
    <div>123</div> //have to change to loader
  ) : (
    <article>
      <div className="article__content">
        <div className="article__author">
          <div className="article__authorLine"></div>
          <AuthorSign />
          <div className="article__authorLine"></div>
        </div>
        <div className="article__header">
          <div className="article__titleBlock">
            <h1>{article.title}</h1>
            <p>{formingDate(article.createdAt)}</p>
          </div>
          <div
            className="article__toolsBlock"
            style={isOwner() ? { display: 'block' } : { display: 'none' }}>
            <button>{penSVG}</button>
            <button>{deleteSVG}</button>
          </div>
        </div>
        <div className="article__body">
          <div className="article__image">
            <img src={article.imageUrl} alt="article-img" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: article.text }}></p>
          <div className="article__tags">
            {article.tags.map((tag, index) => (
              <a href="/" key={index}>
                #{tag}
              </a>
            ))}
          </div>
          <div className="article__views unselectable">
            {viewsSVG}
            {article.viewsCount}
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
