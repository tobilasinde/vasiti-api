import { body } from 'express-validator'
import validate from './BaseValidator.js'
import {
	RESPONSE_VALIDATION_ALPHABETS_REQUIRED,
	RESPONSE_VALIDATION_REQUIRED,
	RESPONSE_ERROR_INVALID_DETAILS,
} from '../../config/systemConfig.js'

const validationRules = {
	create: [
		body('topic')
			.trim()
			.notEmpty()
			.withMessage(RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'Topic'))
			.isString()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Topic'),
			)
			.escape(),
		body('description')
			.trim()
			.optional()
			.isString()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace(
					'{{FIELD}}',
					'Description',
				),
			)
			.escape(),
		body('date')
			.trim()
			.notEmpty()
			.withMessage(RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'Date'))
			.isISO8601()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Date'),
			)
			.escape(),
		body('link')
			.trim()
			.notEmpty()
			.withMessage(RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'Link'))
			.isURL()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Link'),
			),
	],
	update: [
		body('id')
			.trim()
			.notEmpty()
			.withMessage(RESPONSE_VALIDATION_REQUIRED.replace('{{FIELD}}', 'Id'))
			.isString()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Id'),
			)
			.escape(),
		body('topic')
			.trim()
			.optional()
			.isString()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Topic'),
			)
			.escape(),
		body('description')
			.trim()
			.optional()
			.isString()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace(
					'{{FIELD}}',
					'Description',
				),
			)
			.escape(),
		body('date')
			.trim()
			.optional()
			.isISO8601()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Date'),
			)
			.escape(),
		body('link')
			.trim()
			.optional()
			.isURL()
			.withMessage(
				RESPONSE_VALIDATION_ALPHABETS_REQUIRED.replace('{{FIELD}}', 'Link'),
			),
	],
}

export default (routeValidation) => [validationRules[routeValidation], validate]
