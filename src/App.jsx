import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Footer from './components/Footer';

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
        <Article />
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
