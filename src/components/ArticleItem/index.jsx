import AuthorSign from "../AuthorSign";

import "./index.css";

import { viewsSVG } from "../SvgSprite";
import { formingDate } from "../../formingDate";

function ArticleItem({ title, fullDate, imageUrl, text, tags, views, author }) {
  return (
    <div className="articleItem">
      <div className="articleItem__image">
        <div className="articleItem__title">
          <h2>{title}</h2>
          <p>{formingDate(fullDate)}</p>
        </div>
        <img src={imageUrl} alt="article-img" />
      </div>
      <div className="articleItem__description">
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
        <AuthorSign author={author} />
        <div className="articleItem__tags">
          {tags.map((tag, index) => (
            <p key={index + tag + title}>{tag}</p>
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
