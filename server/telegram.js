import axios from 'axios';

export const telegramMessage = (article, authorName) => {
  const token = 'MY_TOKEN';
  const chat_id = '-1001925615260';
  const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

  const message =
    `Друзі, раді повідомити, що на каналі з'явилась нова стаття!\n` +
    `<b>-----------------------------</b>\n` +
    `<b>${article.title.toUpperCase()}</b>\n` +
    `<b>Автор статті:</b> ${authorName}\n` +
    `<b>-----------------------------</b>\n` +
    `Сподіваємось, що цей матеріал Вам сподобається.\n` +
    `Також, не забувайте залишати коментарі та діліться враженнями в нашому telegram-каналі.\n` +
    `Для переходу натисніть <a href="http://ccblog.com.ua/article/${String(
      article._id
    )}"><u>ЧИТАТИ</u></a>`;

  axios
    .post(URI_API, {
      chat_id,
      parse_mode: 'html',
      caption: message,
      photo: 'http://www.ccblog.com.ua/img/ukrainian_blogger.jpg'
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data));
};
