const { Comic } = require("../models");
const createError = require("http-errors");

class Controller {
	static findAll(req, res, next) {
		Comic.findAll()
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(createError(404, "Data not found!"));
			});
	}
	static findOne(req, res, next) {
		Comic.findByPk(req.params.id)
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				next(createError(404, "Data not found!"));
			});
	}
	static update(req, res, next) {
		const id = req.params.id;
		const obj = {
			title: req.body.title,
			author: req.body.author,
			imageUrl: req.body.imageUrl
		}
		const where = {
			where: {
				id: id
			},
			returning: true
		}
		Comic.update(obj, where)
			.then(data => {
				if (data[0] == 0) {
					next(createError(404, "Data not found!"));
				} else {
					res.status(200).json(data)
				}
			})
			.catch(err => {
				next(createError(400), "Invalid");
			});
	}
}

module.exports = Controller;
