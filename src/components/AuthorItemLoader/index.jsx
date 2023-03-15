import './index.css';

function AuthorItemLoader() {
  return (
    <div className="authorItemLoader unselectable">
      <div className="authorItemLoader__avatar"></div>
      <div className="authorItemLoader__info">
        <div className="authorItemLoader__string"></div>
        <div className="authorItemLoader__string"></div>
        <div className="authorItemLoader__statistics">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="authorItemLoader__animation"></div>
    </div>
  );
}

export default AuthorItemLoader;
