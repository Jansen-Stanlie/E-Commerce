"use strict";

const bcrypt = require("bcrypt");
module.exports = {
	async up(queryInterface, Sequelize) {
		const password = bcrypt.hashSync("ADMINECommerce", bcrypt.genSaltSync(10));
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					firstName: "Jansen",
					lastName: "Stanlie",
					email: "JansenStan24@gmail.com",
					password: password,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
