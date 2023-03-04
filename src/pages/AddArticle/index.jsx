import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isAuthCheck } from '../../redux/slices/authorization';

import './index.css';

function AddArticle() {
  //check is authorized from redux
  const isAuthorized = useSelector(isAuthCheck);
  const [articleData, setArticleData] = React.useState({
    imageUrl: '',
    title: '',
    text: '',
    tags: []
  });

  //article fields verification
  function fieldsVerification() {
    return articleData.title.length < 5
      ? 'Перевірте заголовок'
      : articleData.text.length < 500
      ? 'Перевірте текст'
      : !tagsVerification()
      ? 'Перевірте теги'
      : 'Опублікувати';
  }

  //tags verification
  function tagsVerification() {
    return !articleData.tags || articleData.tags.every((tag) => /^#\w+[^#]/.test(tag));
  }

  //formatting tags to array
  function tagsToArray(str) {
    if (str === '') {
      setArticleData((prev) => ({ ...prev, tags: [] }));
    } else {
      setArticleData((prev) => ({ ...prev, tags: str.split(' ') }));
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
        <form encType="multipart/form-data" method="POST" action="/upload">
          <label htmlFor="coverImage" className="addArticle__coverImage">
            Завантажити обкладинку
          </label>
          <input type="file" name="coverImage" id="coverImage" accept="image/png, image/jpg" />
        </form>
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
                [{ indent: '-1' }, { indent: '+1' }],
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
            placeholder="#тег1 #тег2 #тег3 ..."
            onChange={(event) => tagsToArray(event.target.value)}
          />
        </div>
        <div className="addArticle__buttonsBlock">
          <button
            className="acceptButton"
            disabled={fieldsVerification() !== 'Опублікувати'}
            onClick={() => console.log(articleData)}>
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
