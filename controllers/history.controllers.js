const Product = require("../models/index").Products;
const User = require("../models/index").User;
const Balance = require("../models/index").Balance;
const History = require("../models/index").History;
const { sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");

const privateKey = "my-secret";

const purchaseItem = async (req, res, next) => {
	const item = req.body.name;
	const quantity = req.body.quantity;
	console.log("item ", item);
	const result = await sequelize.transaction(async (t) => {
		try {
			const products = await Product.findOne(
				{ where: { name: item } },
				{ transaction: t }
			);
			if (!products) {
				return res.status(400).send({
					status: "Error",
					message: "Failed get product",
				});
			}

			if (products.quantity == 0) {
				return res.status(400).send({
					error: "ERROR",
					message: "Product out of stock",
				});
			}
			if (products.quantity < quantity) {
				return res.status(400).send({
					error: "ERROR",
					message: "Product Not enough",
				});
			}
			const token = req.headers["auth"];

			const user = jwt.verify(token, privateKey, (err, decoded) => {
				return decoded.id;
				console.log("Id User", decoded.id);
			});
			const total_price = quantity * products.price;
			console.log("total Harga", total_price);
			console.log("User id", user);
			const balance = await Balance.findOne(
				{
					where: { user_id: user },
				},
				{ transaction: t }
			);
			if (!balance) {
				return res.status(400).send({
					error: "ERROR",
					message: "User not found",
				});
			}
			if (balance.amount < total_price) {
				return res.status(400).send({
					error: "ERROR",
					message: "Not Enough Amount to buy product",
				});
			}
			Product.update(
				{
					quantity: products.quantity - quantity,
				},
				{
					where: {
						name: item,
					},
				}
			);
			Balance.update(
				{
					amount: balance.amount - total_price,
				},
				{ where: { user_id: user } }
			);
			const buyHistory = await History.create(
				{
					user_id: user,
					product_id: products.id,
					quantity: quantity,
					total_price: total_price,
				},
				{ transaction: t }
			);
			if (!buyHistory) {
				return res.status(400).send({
					status: "Error",
					message: "Failed to purchase product",
				});
			}

			return res.status(200).send({
				status: "Succes",
				message: "Success Purchase Product",
			});
		} catch (error) {
			next(error);
		}
	});
};

const getHistory = async (req, res, next) => {
	const token = req.headers["auth"];

	const user_id = jwt.verify(token, privateKey, (err, decoded) => {
		return decoded.id;
		console.log("Id User", decoded.id);
	});
	console.log("user_id", user_id);
	try {
		const histories = await History.findAll({
			where: {
				user_id: user_id,
			},
			attributes: [
				"id",
				[sequelize.literal(`"user"."email"`), "email"],
				[sequelize.literal(`"user"."firstName"`), "name"],
				"quantity",
				"total_price",
				"createdAt",
			],
			include: [
				{
					model: User,
					as: "user",
					attributes: [],
				},
				{
					model: Product,
					as: "product",
					attributes: ["name", "category", "price"],
				},
			],
		});
		return res.status(200).send({
			status: "Succes",
			message: "Get History success",
			data: histories,
		});
	} catch (error) {
		return res.status(500).send({
			message: "Internal server Error",
			error: error,
		});
	}
};
module.exports = {
	purchaseItem,
	getHistory,
};
