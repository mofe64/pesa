const AppError = require('../util/AppError');
const catchAsync = require('../util/CatchAsync');
const Post = require('../models/PostModel');
const moment = require('moment');

exports.getHomePage = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ featured: true }).limit(6);
  res.status(200).render('index', {
    posts,
    moment,
  });
});

exports.getAdmin = catchAsync(async (req, res, next) => {});
exports.getAdminDashboard = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');
  res.status(200).render('admin/adminHome', {
    posts,
    moment,
  });
});
exports.getCreateBlogPostPage = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/admincreatePost');
});

exports.createBlogPost = catchAsync(async (req, res, next) => {
  let isFeatured;
  if (req.body.featured) {
    isFeatured = true;
  } else {
    isFeatured = false;
  }
  const newPost = await Post.create({
    title: req.body.title,
    coverImage: req.body.coverImage,
    introText: req.body.introText,
    post: req.body.newpost,
    featured: isFeatured,
  });

  res.status(200).redirect('/admin/dashboard');
});

exports.getCloudinaryUploadPage = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/cloudinaryUploadPage');
});

exports.getBlogEditPostPage = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).render('admin/adminEditPost', {
    post,
  });
});
exports.editBlogPost = catchAsync(async (req, res, next) => {
  let isFeatured;
  if (req.body.featured) {
    isFeatured = true;
  } else {
    isFeatured = false;
  }
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return next(new AppError('No post found with that slug', 404));
  }
  const postToEdit = await Post.findByIdAndUpdate(
    post._id,
    {
      title: req.body.title,
      coverImage: req.body.coverImage,
      introText: req.body.introText,
      post: req.body.newpost,
      featured: isFeatured,
    },
    { new: true, runValidators: true }
  );
  res.status(200).redirect('/admin/dashboard');
});
exports.getDeleteBlogPostPage = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return next(new AppError('No post found with that slug', 404));
  }
  //console.log(post);
  res.status(200).render('admin/deletePost', {
    post,
    moment,
  });
});

exports.deleteBlogPost = catchAsync(async (req, res, next) => {
  if (!req.body.confirm) {
    return next(
      new AppError(
        `Looks like you didn't confirm the delete action. please toggle the "are you sure you want to delete" toggle`,
        400
      )
    );
  }
  const post = await Post.findOne({ slug: req.params.slug });
  await Post.findByIdAndDelete(post._id);
  res.redirect('/admin/dashboard');
});
