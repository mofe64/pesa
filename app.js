const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const AppError = require("./util/AppError");
const GlobalErrorHandler = require("./controllers/errorController");

//routers
const viewRouter = require("./routers/viewRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//body parser
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//routes
app.use("/", viewRouter);

//ERROR HANDLER GLOBAL
app.use(GlobalErrorHandler);
module.exports = app;
