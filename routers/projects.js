const express = require("express");
const projects = express.Router();

// создать проект
projects.put("/", (req, res) => {
	const data = req.body.projectName;
	const project = new Project({
		name: data,
		wd: [],
	});
	project.save(function (err) {
		//mongoose.disconnect();
		if (err) {
			res.status(500).end();
			return console.error(err);
		}
		//res.status(201).send(project._id);
		Project.aggregate([{ $project: { _id: 1, name: 1, wd: { $size: "$wd" } } }], (err, doc) => {
			if (err) {
				res.status(500).end();
				return console.error(err);
			}
			res.status(201).send({ id: project._id, projects: doc });
		});
	});
});

// запрос проектов
projects.post("/", (req, res) => {
	Project.aggregate([{ $project: { _id: 1, name: 1, wd: { $size: "$wd" } } }], (err, doc) => {
		if (err) {
			res.status(500).end();
			return console.error(err);
		}
		res.status(200).send(doc);
	});
});
// удалить прект
projects.delete("/", (req, res) => {
	const removeId = req.body.data.removeId;
	Project.deleteOne({ _id: removeId }).exec(function (err, doc) {
		if (err) {
			res.status(500).end();
			return console.error(err);
		}
		Project.aggregate([{ $project: { _id: 1, name: 1, wd: { $size: "$wd" } } }], (err, doc) => {
			if (err) {
				res.status(500).end();
				return console.error(err);
			}
			res.status(200).send(doc);
		});
	});
});

module.exports = projects;
