const joi = require("joi");
const validate = require("../middleware/validate.request");

const addProductSchema = joi.object({
	name: joi.string().alphanum().min(3).max(15).required(),
	category: joi.string().alphanum().min(3).max(15).required(),
	price: joi.number().integer().min(1).max(100000000),
	quantity: joi.number().integer().min(1).max(100000000),
});
function validateProduct(req, res, next) {
	validate(req, res, next, addProductSchema);
}

module.exports = {
	validateProduct,
};
