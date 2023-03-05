import React from 'react';
import ReactQuill from 'react-quill';
import axios from '../../axios.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isAuthCheck } from '../../redux/slices/authorization';

import 'react-quill/dist/quill.snow.css';
import './index.css';

import { closeSVG } from '../../components/SvgSprite.js';

function AddArticle() {
  //check is authorized from redux
  const isAuthorized = useSelector(isAuthCheck);
  //useNavigate for redirect user to Article page after submit the article
  const navigate = useNavigate();
  //cover image file for article
  const [cover, setCover] = React.useState('');
  //article data
  const [articleData, setArticleData] = React.useState({
    imageUrl: '',
    title: '',
    text: '',
    tags: []
  });

  //article fields verification
  function fieldsVerification() {
    return cover === ''
      ? 'Завантажте обкладинку'
      : articleData.title.length < 5
      ? 'Перевірте заголовок'
      : articleData.text.length < 500
      ? 'Перевірте текст'
      : !tagsVerification()
      ? 'Перевірте теги'
      : 'Опублікувати';
  }
  //tags verification
  function tagsVerification() {
    console.log(articleData.tags);
    return !articleData.tags || articleData.tags.every((tag) => /^#[0-9a-zа-яіїєґ]+$/.test(tag));
  }
  //cover verification
  function coverVerification(file) {
    console.log(file);
    file.size < 1000000 ? setCover(file) : alert('Розмір файлу перевищує 1МБ');
  }
  //formatting tags to array
  function tagsToArray(str) {
    if (str === '') {
      setArticleData((prev) => ({ ...prev, tags: [] }));
    } else {
      setArticleData((prev) => ({ ...prev, tags: str.split(' ').map((item) => '#' + item) }));
    }
  }
  //upload cover image on server
  async function uploadCover() {
    try {
      const formData = new FormData();
      const file = cover;
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      return data.url;
    } catch (err) {
      console.log(err);
      alert('Не вдалось завантажити файл');
    }
  }
  //upload article
  async function uploadArticle() {
    const coverUrl = await uploadCover();
    try {
      const { data } = await axios.post('/article', {
        ...articleData,
        imageUrl: `http://localhost:9999${coverUrl}`
      });
      navigate(`/article/${data._id}`);
    } catch (err) {
      alert(
        err.response.data[0]
          ? err.response.data[0].msg
          : err.response.data.message || 'Не вдалось завантажити статтю.'
      );
    }
  }
  //if authorizet redirect to home page
  if (!isAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="addArticle">
      <div className="addArticle__title">
        <div></div>
        <h1>Створити статтю</h1>
        <div></div>
      </div>
      <div className="addArticle__body">
        <div className="addArticle__rules">
          <h3>Поради щодо написання статей:</h3>
          <ul>
            <li>
              <strong>Обкладинка</strong> - розмір файлу для обкладинки не може перевищувати 1МБ.
            </li>
            <li>
              <strong>Заголовок</strong> - заголовок повинен складатись щонайменше з 5 символів.
            </li>
            <li>
              <strong>Текст</strong> - текст повинен містити щонайменше 500 символів. Копіювання
              статей, які належать іншим авторам суворо заборонено.
            </li>
            <li>
              <strong>Теги</strong> - це не обов'язкове поле, але ключові слова допоможуть знайти
              вашу статтю користувачам. Теги записуються через пробіл. В тегах дозволяється
              використовувати тільки літери та цифри.
            </li>
          </ul>
          <p>
            Зверніть увагу, що кнопка публікації буде доступна тільки після коректного заповнення
            обов'язкових елементів статті (обкладинка, заголовок, текст статті).
          </p>
        </div>
        <div className="addArticle__coverBlock">
          {!cover ? (
            <>
              <label htmlFor="coverImage" className="addArticle__coverImage">
                Завантажити обкладинку
              </label>
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                accept="image/*"
                onChange={(event) => {
                  coverVerification(event.target.files[0]);
                }}
              />
            </>
          ) : (
            <div className="addArticle__uploadedImage">
              <div
                className="addArticle__deleteCover"
                onClick={() => {
                  setCover('');
                }}>
                {closeSVG}
              </div>
              {cover.name}
            </div>
          )}
        </div>
        <div className="addArticle__addTitle">
          <input
            type="text"
            placeholder="Заголовок статті"
            value={articleData.title}
            onChange={(event) => setArticleData((prev) => ({ ...prev, title: event.target.value }))}
          />
        </div>
        <ReactQuill
          className="addArticle__quill"
          theme="snow"
          value={articleData.text}
          onChange={(event) => setArticleData((prev) => ({ ...prev, text: event }))}
          modules={{
            toolbar: {
              container: [
                [{ size: ['small', false, 'large'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
                ['clean']
              ]
            }
          }}
        />
        <div className="addArticle__addTags">
          <input
            type="text"
            placeholder="тег1 tag2 тег3 ..."
            onChange={(event) => tagsToArray(event.target.value.toLowerCase())}
          />
        </div>
        <div className="addArticle__buttonsBlock">
          <button
            className="acceptButton"
            disabled={fieldsVerification() !== 'Опублікувати'}
            onClick={uploadArticle}>
            {fieldsVerification()}
          </button>
          <Link to={'/'}>
            <button className="cancelButton">Скасувати</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
