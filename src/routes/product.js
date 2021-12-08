import { Router } from 'express'
const router = Router()

import {
	createAProductController,
	getAProductController,
	getAllProductsContoller,
	updateAProductController,
	deleteAProductContoller,
} from '../controllers/product.js'
// import validate from '../../middlewares/validator/product.js'
router.post(
	'/',
	// validate('create'),
	createAProductController,
)
router.get('/:id', getAProductController)
router.get('/', getAllProductsContoller)
router.put(
	'/',
	// validate('update'),
	updateAProductController,
)
router.delete('/:id', deleteAProductContoller)

export default router
