import { validationResult } from 'express-validator'

/**
 * Checks for Validation errors. If errors, responds with errors Or moves to the next middleware in the Route chain
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 * @param {*} next - Next callback
 */
const validateInputs = async (req, res, next) => {
	//Checks for validation errors
	const errors = await validationResult(req)
	if (!errors.isEmpty())
		return res.status(422).json({
			status: false,
			message: 'Validation Error(s)',
			data: errors.array(),
		})

	return next()
}

export default validateInputs
