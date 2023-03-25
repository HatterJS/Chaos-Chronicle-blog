import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

//dotenv configure
dotenv.config();

// sending an email to confirm new user email address
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_ADDRESS,
    pass: process.env.REACT_APP_EMAIL_PASS
  }
});

export const sendMail = (req, token) => {
  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_ADDRESS,
    to: req.body.email,
    subject: 'Підтвердження реєстрації.',
    // eslint-disable-next-line no-template-curly-in-string
    html: `<p>Шановний(а) ${req.body.fullName}!</p><p>Вітаємо на <b>Chaos Chronicle!</b> Ваш обліковий запис було створено успішно. Щоб підтвердити свою реєстрацію та активувати обліковий запис, будь ласка, натисніть <a href="https://localhost:3000/confirmemail/${token}">ПІДТВЕРДИТИ.</a></p><p></p><p>Якщо ви не реєструвались на нашому сайті, ігноруйте цей лист. Можливо, хтось випадково ввів вашу електронну адресу.</p><p></p><p>Якщо у вас виникли будь-які питання або проблеми з вашим обліковим записом, опишіть обставини у зворотньому листі.</p><p></p><p>Дякуємо,<br>Команда ccblog.com.ua</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
