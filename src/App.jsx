import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Footer from './components/Footer';
import NotFound from './pages/NonFound';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthorizationForm from './components/AuthorizationForm';
import { arrowTop } from './components/SvgSprite';

function App() {
  const [isShowForm, setIsShowForm] = React.useState(false);
  return (
    <div className="App">
      <AuthorizationForm
        isShowForm={isShowForm}
        setIsShowForm={() => setIsShowForm((prevState) => !prevState)}
      />
      <Header setIsShowForm={() => setIsShowForm((prevState) => !prevState)} />
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <div className="arrow__top">
        <a href="#top">{arrowTop}</a>
      </div>
    </div>
  );
}

export default App;
