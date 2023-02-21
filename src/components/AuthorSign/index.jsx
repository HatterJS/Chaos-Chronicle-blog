import './index.css';

function AuthorSign() {
  return (
    <div className="authorSign">
      <img src="img/avatars/01.png" alt="avatar" width={50} height={50} />
      <div className="authorSign__description">
        <p>Mr.Hatter</p>
        <p>Адміністратор</p>
      </div>
    </div>
  );
}

export default AuthorSign;
