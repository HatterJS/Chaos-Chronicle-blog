import { body } from 'express-validator';

export const registrationValidation = [
  body('email', 'Не вірний формат пошти').isEmail(),
  body('password', 'Пароль повинин бути не менше 6-ти символів').isLength({ min: 6 }),
  body('fullName', "Ім'я не може бути менше ніж 2 символи").isLength({ min: 2 }),
  body('avatarUrl', 'Не вірний адрес аватарки').optional().isURL()
];
