import {
	createAProduct,
	updateAProduct,
	deleteAProduct,
	getAllProducts,
	getAProduct,
} from '../services/product.js'

export async function createAProductController(req, res) {
	const result = await createAProduct(req.body)

	const statusCode = result.status ? 200 : 400
	return res.status(statusCode).json(result)
}

export async function updateAProductController(req, res) {
	const result = await updateAProduct(req.body)

	const statusCode = result.status ? 200 : 400
	return res.status(statusCode).json(result)
}

export async function deleteAProductContoller(req, res) {
	const id = req.params.id
	const result = await deleteAProduct(id)

	const statusCode = result.status ? 200 : 400
	return res.status(statusCode).json(result)
}

export async function getAllProductsContoller(req, res) {
	let query = {}
	if (req.query.queryParams) query = JSON.parse(req.query.queryParams)
	const result = await getAllProducts(query)

	return res.status(200).json(result)
}

export async function getAProductController(req, res) {
	const id = req.params.id

	const result = await getAProduct(id)
	return res.status(200).json(result)
}
