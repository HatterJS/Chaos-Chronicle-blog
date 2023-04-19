import React from 'react';
import axios from '../../../axios.js';
import { Link } from 'react-router-dom';

import { viewsSVG } from '../../../components/SvgSprite.js';

import './index.css';

function UserArticles() {
  //my articles
  const [myArticles, setMyArticles] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/myarticles')
      .then((res) => setMyArticles(res.data.myArticles))
      .catch((err) => alert(err.response.data.message));
  }, []);
  return (
    <div className='userArticles'>
      {myArticles ? (
        myArticles.map((item) => (
          <Link
            to={`/article/${item._id}`}
            className='userArticles__item unselectable'
            key={item._id}
          >
            <div className='userArticles__image'>
              <img src={item.imageUrl} alt='cover' />
            </div>
            <div className='userArticles__itemContent'>
              <h4>{item.title}</h4>
              <p>{item.tags.map((item) => '#' + item).join(' ')}</p>
              <div className='userArticles__views'>
                {viewsSVG}
                {item.viewsCount}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>12354</div>
      )}
    </div>
  );
}

export default UserArticles;
