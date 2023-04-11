import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

//dotenv configure
dotenv.config();

// sending an email to confirm new user email address
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_ADDRESS,
    pass: process.env.REACT_APP_EMAIL_PASS,
  },
});

export const sendMail = (req, token) => {
  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_ADDRESS,
    to: req.body.email,
    subject: 'Підтвердження реєстрації.',
    // eslint-disable-next-line no-template-curly-in-string
    html: `<p>Шановний(а) ${req.body.fullName}!</p><p>Вітаємо на <b>Chaos Chronicle!</b> Ваш обліковий запис було створено успішно. Щоб підтвердити свою реєстрацію та активувати обліковий запис, будь ласка, натисніть <a href="https://ccblog.com.ua/confirmemail/${token}">ПІДТВЕРДИТИ.</a></p><p></p><p>Якщо Ви не реєструвались на нашому сайті, ігноруйте цей лист. Можливо, хтось випадково ввів Вашу електронну адресу.</p><p></p><p>Якщо у Вас виникли будь-які питання або проблеми з Вашим обліковим записом, опишіть обставини у зворотньому листі або через <a href="https://t.me/chaosChronicle_bot">Telegram</a>.</p><p></p><p>З повагою,<br>Команда ccblog.com.ua</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const recoveryMail = (email, fullName, token) => {
  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_ADDRESS,
    to: email,
    subject: 'Відновлення паролю.',
    // eslint-disable-next-line no-template-curly-in-string
    html: `<p>Шановний(а) ${fullName}!</p><p>Ми отримали запит на відновлення доступу до Вашого облікового запису на Chaos Chronicle. Щоб відновити доступ, будь ласка, натисніть <a href="https://ccblog.com.ua/recovery/${token}">ВІДНОВИТИ.</a></p><p></p><p>Якщо Ви не звертались з таким запитом, будь ласка, проігноруйте це повідомлення. Ваш пароль не буде змінено. Можливо, хтось випадково ввів Вашу електронну адресу.</p><p></p><p>Якщо у Вас виникли будь-які питання або проблеми з Вашим обліковим записом, опишіть обставини у зворотньому листі або через <a href="https://t.me/chaosChronicle_bot">Telegram</a>.</p><p></p><p>З повагою,<br>Команда ccblog.com.ua</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
