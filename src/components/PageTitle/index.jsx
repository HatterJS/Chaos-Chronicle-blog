import './index.css';

function PageTitle({ title }) {
  return (
    <div className="pageTitle">
      <div className="pageTitle__leftLine"></div>
      <h1>{title}</h1>
      <div className="pageTitle__rightLine"></div>
    </div>
  );
}

export default PageTitle;
