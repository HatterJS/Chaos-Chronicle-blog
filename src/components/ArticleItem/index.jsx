import AuthorSign from '../AuthorSign';
import './index.css';

import { viewsSVG } from '../SvgSprite';

function ArticleItem({ title, fullDate, text, tags, views }) {
  const formatedDate = new Date(fullDate);
  const month = {
    0: 'січня',
    1: 'лютого',
    2: 'березня',
    3: 'квітня',
    4: 'травня',
    5: 'червня',
    6: 'липня',
    7: 'серпня',
    8: 'вересня',
    9: 'жовтня',
    10: 'листопада',
    11: 'грудня'
  };
  const date =
    formatedDate.getDate() +
    ' ' +
    month[formatedDate.getMonth()] +
    ' ' +
    formatedDate.getFullYear();
  return (
    <div className="articleItem">
      <div className="articleItem__image">
        <div className="articleItem__title">
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
        <img src="img/article/Welcome-to-Ukraine-by-Stanislav-Lunin-scaled.jpg" alt="article-img" />
      </div>
      <div className="articleItem__description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
          excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
          ducimus, amet tenetur obcaecati odio quae vel!
        </p>
        <p>{text}</p>
        <AuthorSign />
        <div className="articleItem__tags">
          {tags.map((tag) => (
            <p key={tag}>#{tag}</p>
          ))}
        </div>
        <div className="articleItem__views unselectable">
          {viewsSVG}
          {views}
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
