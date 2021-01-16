import { body } from 'express-validator';

export const loginValid = [
    body('email')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .exists().withMessage('Required')
        .isLength({ min: 8, max: 20 }).withMessage('This field must contain between 8 and 20 characters')
];

export const createValid = [
    body('firstName')
        .exists().withMessage('Required'),
    body('lastName')
        .exists().withMessage('Required'),
    body('email')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .exists().withMessage('Required')
        .isLength({ min: 8, max: 20 }).withMessage('This field must contain between 8 and 20 characters')
];

export const updateValid = [
    body('firstName')
        .exists().withMessage('Required'),
    body('lastName')
        .exists().withMessage('Required')
];

export const changePasswordValid = [
    body('password')
        .exists().withMessage('Required')
        .isLength({ min: 8, max: 20 }).withMessage('This field must contain between 8 and 20 characters')
];