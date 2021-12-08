import Sequelize from 'sequelize'
const env = process.env.NODE_ENV || 'development'
import dbConfig from '../../config/dbConfig.js'
import * as models from './models.js'
const config = dbConfig[env]

const { DataTypes } = Sequelize
const db = {}
let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		...config,
		logging: false,
		multipleStatements: true,
	},
)

Object.keys(models).forEach((file) => {
	const model = models[file](sequelize, DataTypes)
	db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

//Sync Database
sequelize
	.sync({ alter: true })
	.then(async function () {})
	.catch(function (err) {
		console.log(err, 'Something went wrong with the Database Update!')
	})
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
