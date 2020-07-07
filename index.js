const express = require("express");
const app = express();
const port = 3333;
const path = require("path");
const mongoose = require("mongoose");
const projectsRouter = require("./routers/projects");
const projectRouter = require("./routers/project");
const DBconnection = "mongodb://localhost:27017/ags";
// подключение
mongoose.connect(DBconnection, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const Schema = mongoose.Schema;
// установка схемы
const projectScheme = new Schema({
	name: String,
	wd: Object,
});

app.use(express.static(path.join(__dirname, "../ags/build")));
app.use(express.json());

app.use("/projects", projectsRouter);
app.use("/project", projectRouter);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../ags/build/index.html"));
});

app.listen(port, () =>
	console.log("\x1b[43m\x1b[30m%s\x1b[0m", `<====== Сервер запущен http://localhost:${port} ======>`)
);

module.exports = Project = mongoose.model("projects", projectScheme);
