const Balance = require("../models/index").Balance;
const User = require("../models/index").User;

const topUpBalance = async (req, res, next) => {
	try {
		const user_id = req.body.user_id;
		const balance = req.body.balance;

		User.findOne({ where: { id: user_id } })
			.then((user) => {
				if (!user) {
					return res.status(400).send({
						error: "ERROR",
						message: "User not found",
					});
				}
			})
			.then(() => {
				Balance.findOne({
					where: { user_id: user_id },
				}).then((users) => {
					console.log("balance", balance + users.amount);
					return Balance.update(
						{
							amount: balance + users.amount,
						},
						{
							where: { user_id: user_id },
						}
					);
				});
			})
			.then(() => {
				return Balance.findOne({
					where: { user_id: user_id },
				});
			})
			.then((users) => {
				res.status(200).send({
					status: "SUCCESS",
					message: `User Balance with id: ${user_id} has been updated`,
				});
			})
			.catch((e) => {
				console.log(e);
				res.status(503).send({
					status: "FAIL",
					message: "Top Up Failed",
				});
			});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	topUpBalance,
};
