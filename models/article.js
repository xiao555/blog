import mongoose from 'mongoose'
import dateFormat from 'dateformat'
const Schema = mongoose.Schema;
const articleSchema = new mongoose.Schema({
  title: String,
  visits: {
    type: Number,
    default: 0
  },
  tags: [{
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
}, {
  versionKey: false
})

articleSchema.path('createTime').get(function (v) {
  return dateFormat(new Date(v), 'yyyy-MM-dd hh:mm:ss');
});
articleSchema.path('lastEditTime').get(function (v) {
  return dateFormat(new Date(v), 'yyyy-MM-dd hh:mm:ss');
});

export default mongoose.model('article', articleSchema)

