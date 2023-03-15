import './index.css';

function AuthorSign({ author }) {
  const { fullName, avatarUrl, status } = author;
  return (
    <div className="authorSign">
      <img
        src={avatarUrl || 'http://localhost:3000/img/avatars/defaultAvatar.png'}
        alt="avatar"
        width={50}
        height={50}
      />
      <div className="authorSign__description">
        <p>{fullName || 'Анонім'}</p>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default AuthorSign;
