const joi = require("joi");
const validate = require("../middleware/validate.request");

const purchaseProductSchema = joi.object({
	name: joi.string().alphanum().min(3).max(15).required(),
	quantity: joi.number().integer().min(1).max(100000000),
});
function validatePurchase(req, res, next) {
	validate(req, res, next, purchaseProductSchema);
}

module.exports = {
	validatePurchase,
};
