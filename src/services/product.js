import Repository from '../database/repository.js'
import {
	RESPONSE_ERROR_DUPLICATE_RECORD,
	SUCCESS_RESPONSE_CREATE_RECORD,
	RESPONSE_ERROR_NOT_FOUND,
	SUCCESS_RESPONSE_UPDATE_RECORD,
	SUCCESS_RESPONSE_GET_ALL_RECORD,
	SUCCESS_RESPONSE_DELETE_RECORD,
	SUCCESS_RESPONSE_GET_ONE_RECORD,
} from '../config/systemConfig.js'
import CustomError from '../utils/customError.js'

const productRepository = Repository('product')

// Create a new product
export async function createAProduct(data) {
	try {
		const [product, check] = await productRepository.create({
			where: {
				product_name: data.product_name,
			},
			defaults: {
				product_description: data.product_description,
				product_category: data.product_category,
				product_varieties: JSON.stringify(data.product_varieties),
				date_uploaded: new Date(),
			},
		})
		if (!check) throw new CustomError(RESPONSE_ERROR_DUPLICATE_RECORD, 400)

		if (product.product_varieties)
			product['product_varieties'] = JSON.parse(product.product_varieties)
		//Success Response
		return {
			status: true,
			message: SUCCESS_RESPONSE_CREATE_RECORD.replace('{{MODEL}}', 'Product'),
			data: product,
		}
	} catch (e) {
		throw new CustomError(e.message, 400)
	}
}

// Update an existing product
export async function updateAProduct(data) {
	try {
		const query = {
			where: { id: data.id },
		}
		const checkProduct = await productRepository.findOne(query)
		if (!checkProduct)
			throw new CustomError(
				RESPONSE_ERROR_NOT_FOUND.replace('{{MODEL}}', 'Product'),
				404,
			)

		const productData = {
			date_edited: new Date(),
		}
		if (data.product_name) productData.product_name = data.product_name
		if (data.product_description)
			productData.product_description = data.product_description
		if (data.product_category)
			productData.product_category = data.product_category
		if (data.product_varieties)
			productData.product_varieties = JSON.stringify(data.product_varieties)
		await productRepository.update(productData, query)

		//Success Response
		return {
			status: true,
			message: SUCCESS_RESPONSE_UPDATE_RECORD.replace('{{MODEL}}', 'Product'),
		}
	} catch (e) {
		throw new CustomError(e.message, 400)
	}
}

// Helper Function to Prepare the Params argument passed into the getAll respository function
export function prepareGetAllParams(query) {
	let params = { where: {} }
	if (query.filter) {
		const filter = query.filter
		if (filter.product_name && filter.product_name !== '')
			params.where.product_name = {
				[productRepository.Op.like]: `%${filter.product_name}%`,
			}
	}
	if (query.sortField && query.sortField !== '') {
		params.order = [
			[query.sortField, query.sortOrder ? query.sortOrder : 'asc'],
		]
	}
	if (query.pageSize && Number(query.pageSize) == query.pageSize) {
		params.limit = Number(query.pageSize)
		Number(query.pageNumber)
			? (params.offset = (query.pageNumber - 1) * query.pageSize)
			: 0
	}

	return params
}

// Get all Products in the bussiness
export async function getAllProducts(query) {
	try {
		let params = prepareGetAllParams(query)
		let productList = await productRepository.findAll(params)
		productList.rows.map(
			(prod) => (prod['product_varieties'] = prod.product_varieties),
		)
		let data = {
			totalCount: productList.count,
			entities: productList.rows.map((prod) => {
				if (prod.product_varieties)
					prod['product_varieties'] = JSON.parse(prod.product_varieties)
				return prod
			}),
		}
		//Success Response
		return {
			status: true,
			message: SUCCESS_RESPONSE_GET_ALL_RECORD.replace('{{MODEL}}', 'Product'),
			data,
		}
	} catch (e) {
		throw new CustomError(e.message, 400)
	}
}

// Delete an existing product
export async function deleteAProduct(id) {
	try {
		const check = await productRepository.delete({
			where: { id },
		})

		if (!check)
			throw new CustomError(
				RESPONSE_ERROR_NOT_FOUND.replace('{{MODEL}}', 'Product'),
				404,
			)

		//Success Response
		return {
			status: true,
			message: SUCCESS_RESPONSE_DELETE_RECORD.replace('{{MODEL}}', 'Product'),
		}
	} catch (e) {
		throw new CustomError(e.message, 400)
	}
}

export async function getAProduct(id) {
	try {
		const savedProduct = await productRepository.findById(id)

		if (!savedProduct)
			throw new CustomError(
				RESPONSE_ERROR_NOT_FOUND.replace('{{MODEL}}', 'Product'),
				404,
			)
		if (savedProduct.product_varieties)
			savedProduct['product_varieties'] = JSON.parse(
				savedProduct.product_varieties,
			)
		return {
			status: true,
			message: SUCCESS_RESPONSE_GET_ONE_RECORD.replace('{{MODEL}}', 'Product'),
			data: savedProduct,
		}
	} catch (e) {
		throw new CustomError(e.message, 400)
	}
}
