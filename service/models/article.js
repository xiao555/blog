import mongoose from 'mongoose'
import dateFormat from 'dateformat'
const Schema = mongoose.Schema;
const articleSchema = new mongoose.Schema({
  title: String,
  path: String,
  visits: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    ref: 'tag'
  }],
  createTime: Date,
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  excerpt: String,
  content: String,
  category: {
    type: String,
    ref: 'category'
  }
}, {
  versionKey: false
})
articleSchema.set('toJSON', { getters: true, virtuals: true});
articleSchema.set('toObject', { getters: true, virtuals: true});
articleSchema.path('createTime').get(function (v) {
  return dateFormat(new Date(v), 'yyyy-MM-dd');
});
articleSchema.path('lastEditTime').get(function (v) {
  return dateFormat(new Date(v), 'yyyy-MM-dd');
});

export default mongoose.model('article', articleSchema)

