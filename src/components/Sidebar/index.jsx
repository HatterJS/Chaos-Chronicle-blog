import AuthorSign from '../AuthorSign';
import './index.css';

function Sidebar() {
  return (
    <aside>
      <div className="aside__tagsBlock">
        <h3>Популярні теги</h3>
        <div className="aside__tags">
          <a href="/">#Україна</a>
          <a href="/">#перемога</a>
          <a href="/">#робота</a>
          <a href="/">#війна</a>
          <a href="/">#особистаісторія</a>
        </div>
      </div>
      <div className="aside__commentsBlock unselectable">
        <h3>Останні коментарі</h3>
        <div className="aside__commentItem">
          <AuthorSign />
          <div className="aside__commentText">
            Мені дуже сподобався цей блог. Буду продовжувати читати.
          </div>
        </div>
        <div className="aside__commentItem">
          <AuthorSign />
          <div className="aside__commentText">
            Мені дуже сподобався цей блог. Буду продовжувати читати.
          </div>
        </div>
        <div className="aside__commentItem">
          <AuthorSign />
          <div className="aside__commentText">
            Мені дуже сподобався цей блог. Буду продовжувати читати.
          </div>
        </div>
        <div className="aside__commentItem">
          <AuthorSign />
          <div className="aside__commentText">
            Мені дуже сподобався цей блог. Буду продовжувати читати.
          </div>
        </div>
        <div className="aside__commentItem">
          <AuthorSign />
          <div className="aside__commentText">
            Мені дуже сподобався цей блог. Буду продовжувати читати.
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
