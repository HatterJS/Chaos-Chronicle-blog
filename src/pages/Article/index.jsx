import React from 'react';
import axios from '../../axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthorSign from '../../components/AuthorSign';
import CommentsBlock from '../../components/CommentsBlock';
import { setSearch } from '../../redux/slices/articles';

import './index.css';

import { deleteSVG, penSVG, viewsSVG } from '../../components/SvgSprite';
import { formingDate } from '../../formingDate';

function Article() {
  //dispatch for redux
  const dispatch = useDispatch();
  //get authorized user data from redux to determine the rights to correct and delete the article
  const { userData } = useSelector((state) => state.authorization);
  //get params from URL bar
  const { id } = useParams();
  //useNavigate for redirect user to another page
  const navigate = useNavigate();
  //article object
  const [article, setArticle] = React.useState({});
  //is loading an article state
  const [isLoading, setIsLoading] = React.useState(true);
  //set search value and navigate to home page
  function onClickTag(tag) {
    dispatch(setSearch(tag));
    navigate('/');
  }
  //checking that the user is the owner of the article
  async function deleteArticle() {
    if (window.confirm('Ви пеерконані, що бажаєте видалити статтю?')) {
      await axios.delete(`/article/${id}`);
      alert('Статтю видалено успішно.');
      navigate('/');
    }
  }
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
          <AuthorSign author={article.author} />
          <div className="article__authorLine"></div>
        </div>
        <div className="article__header">
          <div className="article__titleBlock">
            <h1>{article.title}</h1>
            <p>{formingDate(article.createdAt)}</p>
          </div>
          <div
            className="article__toolsBlock"
            style={isOwner() ? { display: 'flex' } : { display: 'none' }}>
            <Link to={`/editarticle/${id}`}>
              <button>{penSVG}</button>
            </Link>
            <button onClick={deleteArticle}>{deleteSVG}</button>
          </div>
        </div>
        <div className="article__body">
          <div className="article__image">
            <img src={article.imageUrl} alt="article-img" />
          </div>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={article.text} />
        </div>
        <div className="article__footer">
          <div className="article__tags">
            {article.tags.map((tag, index) => (
              <div key={index + tag} onClick={() => onClickTag(tag)}>
                #{tag}
              </div>
            ))}
          </div>
          <div className="article__views unselectable">
            {viewsSVG}
            {article.viewsCount}
          </div>
        </div>
      </div>
      <CommentsBlock />
    </article>
  );
}

export default Article;
