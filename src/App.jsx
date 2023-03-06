import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthorizationForm from './components/AuthorizationForm';

import Home from './pages/Home';
import Registration from './pages/Registration';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Sponsorship from './pages/Sponsorship';
import Privacy from './pages/Privacy';
import Article from './pages/Article';
import AddArticle from './pages/AddArticle';
import NotFound from './pages/NonFound';

import './App.css';

import { arrowTop } from './components/SvgSprite';
import { fetchToken } from './redux/slices/authorization';

function App() {
  //create dispatch for redux
  const dispatch = useDispatch();
  //show/hide authorization form
  const [isShowForm, setIsShowForm] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  return (
    <div className="App">
      <AuthorizationForm isShowForm={isShowForm} setIsShowForm={setIsShowForm} />
      <Header setIsShowForm={() => setIsShowForm(true)} />
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/editarticle/:id" element={<AddArticle />} />
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