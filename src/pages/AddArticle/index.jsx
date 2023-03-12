import React from 'react';
import ReactQuill from 'react-quill';
import axios from '../../axios.js';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle/index.jsx';

import 'react-quill/dist/quill.snow.css';
import './index.css';

import { isAuthCheck } from '../../redux/slices/authorization';
import { closeSVG } from '../../components/SvgSprite.js';

function AddArticle() {
  //check is authorized from redux
  const isAuthorized = useSelector(isAuthCheck);
  //useNavigate for redirect user to Article page after submit the article
  const navigate = useNavigate();
  //get the id of the article if it is an edit page
  const { id } = useParams();
  //state for cover name while correcting article
  const [oldCoverUrl, setOldCoverUrl] = React.useState('');
  //cover image file for article
  const [cover, setCover] = React.useState('');
  //article data
  const [articleData, setArticleData] = React.useState({
    imageUrl: '',
    title: '',
    text: '',
    tags: ''
  });

  //article fields verification
  function fieldsVerification() {
    return cover === '' && !id
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
    return (
      !articleData.tags ||
      articleData.tags.split(' ').every((tag) => /^[0-9A-zА-яіїєґ]+$/.test(tag))
    );
  }
  //cover verification
  function coverVerification(file) {
    if (file.size < 1000000) {
      setCover(file);
    } else alert('Розмір файлу перевищує 1МБ');
  }
  //upload cover image to server
  async function uploadCover() {
    try {
      const formData = new FormData();
      formData.append('image', cover);
      const { data } = await axios.post(`/upload?&dir=articles`, formData);
      return data.url;
    } catch (err) {
      alert('Не вдалось завантажити файл');
    }
  }
  //upload article
  async function uploadArticle() {
    const coverUrl = cover ? 'http://localhost:9999' + (await uploadCover()) : oldCoverUrl;
    try {
      const { data } = id
        ? await axios.patch(`/article/${id}`, {
            ...articleData,
            imageUrl: coverUrl,
            tags: articleData.tags.split(' ')
          })
        : await axios.post('/article', {
            ...articleData,
            imageUrl: coverUrl,
            tags: articleData.tags.split(' ')
          });
      navigate(`/article/${data._id}`);
      alert(data.message);
    } catch (err) {
      alert(
        err.response.data[0]
          ? err.response.data[0].msg
          : err.response.data.message || 'Не вдалось завантажити статтю.'
      );
    }
  }
  React.useEffect(() => {
    if (id) {
      axios.get(`/article/${id}`).then((res) => {
        const { imageUrl, title, text, tags } = res.data;
        setArticleData({
          imageUrl,
          title,
          text,
          tags: tags.join(' ')
        });
        setOldCoverUrl(imageUrl);
      });
    }
  }, [id]);
  //if authorizet redirect to home page
  if (!isAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="addArticle">
      <PageTitle title={id ? 'Редагування статті' : 'Створити статтю'} />
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
                {id
                  ? oldCoverUrl.substring(oldCoverUrl.lastIndexOf('-') + 1)
                  : 'Завантажити обкладинку'}
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
              <div className="addArticle__deleteCover" onClick={() => setCover('')}>
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
            value={articleData.tags}
            onChange={(event) => setArticleData((prev) => ({ ...prev, tags: event.target.value }))}
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
