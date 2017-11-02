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
    ref: 'Tag'
  }],
  createTime: {
    type: String,
    default: dateFormat(new Date(), 'yyyy-mm-dd')
  },
  lastEditTime: {
    type: String,
    default: dateFormat(new Date(), 'yyyy-mm-dd')
  },
  status: {
    type: String,
    default: 'Published'
  },
  excerpt: {
    type: String,
    default: ''
  },
  excerptMarkdown: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  markdown: {
    type: String,
    default: ''
  },
  toc: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    ref: 'Category'
  }
}, {
  versionKey: false
})
articleSchema.set('toJSON', { getters: true, virtuals: true});
articleSchema.set('toObject', { getters: true, virtuals: true});

export default mongoose.model('article', articleSchema)
