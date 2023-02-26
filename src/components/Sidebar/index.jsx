import { Link } from 'react-router-dom';
import AuthorSign from '../AuthorSign';
import './index.css';

function Sidebar({ tags }) {
  return (
    <aside>
      <div className="aside__tagsBlock">
        <h3>Популярні теги</h3>
        <div className="aside__tags">
          {tags.map((tag) => (
            <a href="/" key={tag}>
              #{tag}
            </a>
          ))}
        </div>
      </div>
      <div className="aside__commentsBlock unselectable">
        <h3>Останні коментарі</h3>
        <Link to={'/article'}>
          <div className="aside__commentItem">
            <AuthorSign />
            <div className="aside__commentText">
              Мені дуже сподобався цей блог. Буду продовжувати читати.
            </div>
          </div>
        </Link>
        <Link to={'/article'}>
          <div className="aside__commentItem">
            <AuthorSign />
            <div className="aside__commentText">
              Мені дуже сподобався цей блог. Буду продовжувати читати.
            </div>
          </div>
        </Link>
        <Link to={'/article'}>
          <div className="aside__commentItem">
            <AuthorSign />
            <div className="aside__commentText">
              Мені дуже сподобався цей блог. Буду продовжувати читати.
            </div>
          </div>
        </Link>
        <Link to={'/article'}>
          <div className="aside__commentItem">
            <AuthorSign />
            <div className="aside__commentText">
              Мені дуже сподобався цей блог. Буду продовжувати читати.
            </div>
          </div>
        </Link>
        <Link to={'/article'}>
          <div className="aside__commentItem">
            <AuthorSign />
            <div className="aside__commentText">
              Мені дуже сподобався цей блог. Буду продовжувати читати.
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
