const Product = require("../models/index").Products;

const addProduct = async (req, res, next) => {
	try {
		const name = req.body.name;
		const category = req.body.category;
		const price = req.body.price;
		const quantity = req.body.quantity;

		Product.findOne({ where: { name: name } }).then((user) => {
			if (!user) {
				Product.create({
					name: name,
					category: category,
					price: price,
					quantity: quantity,
				});
				return res.status(200).send({
					status: "SUCCESS",
					message: "Product Inserted",
				});
			}

			return res.status(400).send({
				error: "ERROR",
				message: "Product already registered, please update product info",
			});
		});
	} catch (err) {
		next(err);
	}
};

const getProduct = async (req, res, next) => {
	try {
		return Product.findAll({
			order: [["id", "ASC"]],
		})
			.then((product) => {
				res.status(200).send({
					status: "SUCCESS",
					message: "Data Fetched",
					data: product,
					length: product.length,
				});
			})
			.catch((e) => {
				console.log(e);
				res.status(503).send({
					status: "FAIL",
					message: "Fetched Data Failed",
				});
			});
	} catch (err) {
		next(err);
	}
};

const updateProduct = async (req, res, next) => {
	try {
		const name = req.body.name;
		const price = req.body.price;
		const quantity = req.body.quantity;
		return Product.findOne({
			where: { name: name },
		})
			.then((product) => {
				console.log("Product", product);
				if (product !== null) {
					return Product.update(
						{ price: price, quantity: quantity },
						{
							where: { name: name },
						}
					)
						.then(() => {
							return Product.findOne({
								where: { name: name },
							});
						})
						.then((products) => {
							res.status(200).send({
								status: "SUCCESS",
								message: `Product with name ${name} has been updated`,
								data: products,
							});
						});
				} else {
					res.status(503).send({
						status: "FAIL",
						message: "No Data in Database",
					});
				}
			})
			.catch((e) => {
				console.log(e);
				res.status(503).send({
					status: "FAIL",
					message: "Update Data Failed",
				});
			});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addProduct,
	getProduct,
	updateProduct,
};
