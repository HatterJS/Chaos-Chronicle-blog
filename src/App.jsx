import Header from './components/Header';
import Banner from './components/Banner';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <main>
        <div className="sign"></div>
        <nav>
          <ul>
            <li>Нові</li>
            <li>Популярні</li>
            <li>Автори</li>
          </ul>
          <div className="nav__search">
            <input type="search" />
          </div>
        </nav>
        <div className="articles">
          <div className="article">
            <div className="article__image">
              <img
                src="img/article/Welcome-to-Ukraine-by-Stanislav-Lunin-scaled.jpg"
                alt="article-img"
              />
            </div>
            <div className="article__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi consequuntur dicta
              excepturi fuga, nihil pariatur accusamus possimus maxime libero non earum commodi sint
              ducimus, amet tenetur obcaecati odio quae vel!
            </div>
          </div>
        </div>
        <aside>
          <div className="aside__tags">
            <p>Популярні теги</p>
            <ul>
              <li>Україна</li>
              <li>перемога</li>
              <li>робота</li>
            </ul>
          </div>
          <div className="aside__comments">
            <p>Останні коментарі</p>
            <div className="comment">
              <div className="comment__avatar">
                <img src="img/avatars/01.png" alt="avatar" />
              </div>
              <div className="comment__content">
                <div className="comment__userName">Василь Черешня</div>
                <div className="comment__text">
                  Мені дуже сподобався цей блог. Буду продовжувати читати.
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <footer>
        <div className="footer__logo"></div>
        <div className="footer__social"></div>
      </footer>
    </div>
  );
}

export default App;
