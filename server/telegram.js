import axios from 'axios';

export const telegramMessage = (article, authorName) => {
  console.log(String(article._id), article.imageUrl, article.title, authorName);
  const token = '6288529531:AAEiA4rGEBzSVSRtVy3ui60Z7NGemXGXUBg';
  const chat_id = '-1001925615260';
  const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

  const message =
    `\n` +
    `<b>НОВА СТАТТЯ!</b>\n` +
    `<b>-----------------------------</b>\n` +
    `<b>${article.title}</b>\n` +
    `<b>Автор:</b> ${authorName}\n` +
    `Для переходу натисни <a href="https://uk.wikipedia.org/wiki/Nature">тут</a>`;

  // axios.post(URI_API, {
  //   chat_id,
  //   parse_mode: 'html',
  //   caption,
  //   photo:
  //     'https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0-%D0%B6%D1%83%D1%80%D0%BD%D0%B0%D0%BB.JPG'
  // });
  axios.post(URI_API, {
    chat_id,
    parse_mode: 'html',
    text: message
  });
};
