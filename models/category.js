import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
  name: String
}, {
  versionKey: false
})

export default mongoose.model('category', categorySchema)

