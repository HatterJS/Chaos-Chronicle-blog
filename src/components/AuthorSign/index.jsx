import './index.css';

function AuthorSign({ authorName }) {
  return (
    <div className="authorSign">
      <img src="/img/avatars/01.png" alt="avatar" width={50} height={50} />
      <div className="authorSign__description">
        <p>{authorName || 'Анонім'}</p>
        <p>Адміністратор</p>
      </div>
    </div>
  );
}

export default AuthorSign;
