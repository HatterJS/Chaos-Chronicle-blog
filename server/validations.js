import { body } from 'express-validator';

export const registrationValidation = [
  body('email', 'Не вірний формат пошти').isEmail(),
  body('password', 'Пароль повинин бути не менше 6-ти символів').isLength({ min: 6 }),
  body('fullName', "Ім'я не може бути менше ніж 2 символи").isLength({ min: 2 })
  // body('avatarUrl', 'Не вірний адрес аватарки').optional().isURL()
];

export const authorizationValidation = [
  body('email', 'Не вірний формат пошти').isEmail(),
  body('password', 'Пароль повинин містити не менше 6-ти символів').isLength({ min: 6 })
];

export const articleValidation = [
  body('title', 'Відсутній заголовок статті').isLength({ min: 5 }).isString(),
  body('text', 'Відсутній текст статті (щонайменше 15 символів)').isLength({ min: 15 }).isString(),
  body('tags', 'Не вірний формат тегів (очікується массив)').optional().isArray()
  // body('imageUrl', 'Не вірна адреса зображення').optional().isURL()
];
