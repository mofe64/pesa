const catchAsync = require('../util/CatchAsync');
const AppError = require('../util/AppError');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
