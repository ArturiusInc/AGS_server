const express = require("express");
const project = express.Router();
const mongoose = require("mongoose");

// запрос проекта
project.post("/", (req, res) => {
	const id = req.body.id;
	console.log("req:", id);

	Project.findById(id).exec(function (err, doc) {
		if (err) {
			res.status(500).end();
			return console.log(err);
		}
		console.log("doc123:", doc);
		if (doc) {
			res.status(200).send(doc.wd);
		}
	});
});

module.exports = project;
