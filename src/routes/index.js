import { Router } from 'express'
const router = Router()

// Import Application Routes
import productRoutes from './product.js'

router.use('/api/products', productRoutes)

// Route Not Found
router.use('*', (req, res) => {
	res.sendStatus(404)
})

export default router
