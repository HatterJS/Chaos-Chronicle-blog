import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import ArticleItem from './components/ArticleItem';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <main>
        <div className="sign"></div>
        <Navbar />
        <ArticleItem />
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
