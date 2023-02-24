import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthorizationForm from './components/AuthorizationForm';

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
      {/* <div className="pageTitle">
        <div></div>
        <h1>Нові статті</h1>
        <div></div>
      </div> */}
      <main>
        <Routes>
          <Route path="/article" element={<Article />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
