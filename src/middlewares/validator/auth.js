const { check } = require('express-validator');
const validate = require('./BaseValidator');
const config = require('../../config/systemConfig');

const validationRules = {
    login: [
        check('private_key').trim().notEmpty()
            .withMessage(config.RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'PRIVATE KEY')),
        check('public_key').trim().notEmpty()
            .withMessage(config.RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'PUBLIC KEY')),
        check('module_id').trim().notEmpty()
            .withMessage(config.RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'MODULE ID')),
    ],
    refresh: [
        check('refreshToken').trim().notEmpty()
            .withMessage(config.RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'REFRESH TOKEN')),
    ],
};


module.exports = (routeValidation) => [
    validationRules[routeValidation],
    validate
];
