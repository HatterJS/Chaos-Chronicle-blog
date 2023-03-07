import './index.css';

function AuthorSign({ authorName, avatarUrl }) {
  return (
    <div className="authorSign">
      <img
        src={avatarUrl || 'http://localhost:3000/img/avatars/defaultAvatar.png'}
        alt="avatar"
        width={50}
        height={50}
      />
      <div className="authorSign__description">
        <p>{authorName || 'Анонім'}</p>
        <p>Адміністратор</p>
      </div>
    </div>
  );
}

export default AuthorSign;
