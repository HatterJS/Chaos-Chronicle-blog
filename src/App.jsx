import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Navbar />
      <div className="pageTitle">
        <div></div>
        <h1>Нові статті</h1>
        <div></div>
      </div>
      <main>
        <Home />
      </main>
      <footer>
        <div className="footer__logo"></div>
        <div className="footer__social"></div>
      </footer>
    </div>
  );
}

export default App;
