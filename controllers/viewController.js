const AppError = require("../util/AppError");
const catchAsync = require("../util/CatchAsync");

exports.getHomePage = catchAsync(async (req, res, next) => {
  res.status(200).render("index");
});
