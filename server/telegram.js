import axios from 'axios';
import dotenv from 'dotenv';

//dotenv configure
dotenv.config();

export const telegramMessage = (article, authorName, appeal) => {
  const token = process.env.REACT_APP_TELEGRAM_TOKEN;
  const chat_ids = ['-1001925615260'];
  const URI_API = `https://api.telegram.org/bot${token}/sendPhoto`;

  const message =
    `${appeal}\n` +
    `<b>-----------------------------</b>\n` +
    `<b>${article.title.toUpperCase()}</b>\n` +
    `<b>Автор статті:</b> ${authorName}\n` +
    `<b>-----------------------------</b>\n` +
    `Сподіваємось, що цей матеріал Вам сподобається.\n` +
    `Також, не забувайте залишати коментарі та діліться враженнями в нашому telegram-каналі.\n` +
    `Для переходу натисніть <a href="http://ccblog.com.ua/article/${String(
      article._id
    )}"><u>ЧИТАТИ</u></a>`;

  const requests = chat_ids.map((chat_id) => {
    return axios.post(URI_API, {
      chat_id,
      parse_mode: 'html',
      caption: message,
      photo: 'http://www.ccblog.com.ua/img/ukrainian_blogger.jpg'
    });
  });

  axios
    .all(requests)
    .then((res) => console.log(`user ${authorName} send message to TG`))
    .catch((err) => console.log(err.response.data));
};
