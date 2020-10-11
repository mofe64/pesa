const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();

router.route('/').get(viewController.getHomePage);
router.route('/admin/dashboard').get(viewController.getAdminDashboard);
router
  .route('/admin/blog')
  .get(viewController.getCreateBlogPostPage)
  .post(viewController.createBlogPost);

router.route('/admin/cloudinary').get(viewController.getCloudinaryUploadPage);

router
  .route('/admin/blog/:slug')
  .get(viewController.getBlogEditPostPage)
  .patch(viewController.editBlogPost);

router
  .route('/admin/deletepost/:slug')
  .get(viewController.getDeleteBlogPostPage)
  .delete(viewController.deleteBlogPost);

module.exports = router;
