import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Footer from './components/Footer';
import NotFound from './pages/NonFound';
import AuthorizationForm from './components/AuthorizationForm';
import Registration from './pages/Registration';

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
        <Route path="/article/:id" element={<Article />} />
        <Route path="/registration" element={<Registration />} />
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
