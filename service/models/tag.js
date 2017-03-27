import mongoose from 'mongoose'
const tagSchema = new mongoose.Schema({
  name: String
}, {
  versionKey: false
})

export default mongoose.model('tag', tagSchema)

