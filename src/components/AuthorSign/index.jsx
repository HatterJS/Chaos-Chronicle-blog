import "./index.css";

function AuthorSign({ author }) {
  const { fullName, avatarUrl, status } = author;
  return (
    <div className="authorSign">
      <div>
        <div className="authorSign__avatar">
          <img src={avatarUrl} alt="avatar" />
        </div>
      </div>
      <div className="authorSign__description">
        <p>{fullName}</p>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default AuthorSign;
