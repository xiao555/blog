import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
  name: String,
  number: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false
})

export default mongoose.model('category', categorySchema)

