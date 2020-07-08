const express = require("express");
const project = express.Router();

// запрос проекта
project.post("/", (req, res) => {
	const id = req.body.id;

	Project.findById(id).exec(function (err, doc) {
		if (err) {
			res.status(500).end();
			return console.error(err);
		}
		if (doc) {
			res.status(200).send(doc.wd);
		}
	});
});

module.exports = project;
