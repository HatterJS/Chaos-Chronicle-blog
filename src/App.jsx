import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AuthorizationForm from './components/AuthorizationForm';

import Home from './pages/Home';
import Registration from './pages/Registration';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Sponsorship from './pages/Sponsorship';
import Privacy from './pages/Privacy';
import Agreement from './pages/Agreement';
import Article from './pages/Article';
import AddArticle from './pages/AddArticle';
import NotFound from './pages/NonFound';
import UserSettings from './pages/UserSettings';
import Authors from './pages/Authors';
import AuthorArticles from './pages/AuthorArticles';
import EmailConfirmation from './pages/EmailConfirmation';
import PasswordRecovery from './pages/PasswordRecovery';
import Warning from './components/Warning';

import './App.css';

import ScrollToTop from './components/ScrollToTop';
import { fetchToken } from './redux/slices/authorization';

function App() {
  //check is authorized from redux
  const { userData } = useSelector((state) => state.authorization);
  //create dispatch for redux
  const dispatch = useDispatch();
  //show/hide authorization form
  const [isShowForm, setIsShowForm] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);
  return (
    <div className='App'>
      <AuthorizationForm
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
      />
      <Header setIsShowForm={() => setIsShowForm(true)} />
      {userData && !userData.emailConfirmed && <Warning />}
      <main>
        <ScrollToTop /> {/* scrolling up while navigating to any page */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/sponsorship' element={<Sponsorship />} />
          <Route path='/privacypolicy' element={<Privacy />} />
          <Route path='/agreement' element={<Agreement />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/addarticle' element={<AddArticle />} />
          <Route path='/editarticle/:id' element={<AddArticle />} />
          <Route path='/usersettings/*' element={<UserSettings />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/authorarticles/:id' element={<AuthorArticles />} />
          <Route path='/confirmemail/:id' element={<EmailConfirmation />} />
          <Route path='/recovery/:id' element={<PasswordRecovery />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
