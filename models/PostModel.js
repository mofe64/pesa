const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the title'],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  introText: {
    type: String,
  },
  post: {
    type: String,
    required: [true, 'Post is missing '],
  },
  coverImage: {
    type: String,
    default:
      'https://res.cloudinary.com/pesa/image/upload/v1602440257/PesaCover_efovsm.jpg',
  },
  author: {
    type: String,
    default: 'The Team',
  },
  featured: {
    type: Boolean,
  },
});

postSchema.pre('save', function (next) {
  this.slug = slugify(`${this.title}`, { lower: true });
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
