/*************************************************************************
POSTS TABLE
*************************************************************************/

export default function (sequelize, Sequelize) {
	var product = sequelize.define('product', {
		product_name: {
			type: Sequelize.STRING,
			unique: true,
		},
		product_description: {
			type: Sequelize.TEXT,
		},
		product_category: {
			type: Sequelize.STRING,
		},
		product_varieties: {
			type: Sequelize.TEXT,
		},
		date_uploaded: {
			type: Sequelize.DATE,
		},
		date_edited: {
			type: Sequelize.DATE,
		},
	})
	return product
}
