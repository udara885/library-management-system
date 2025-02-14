import mongoose from "mongoose"

const memberSchema = new mongoose.Schema( {
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  phone: {
    type: String,
    require:true
  }
}, {
  timestamps: true
} )

const Member = mongoose.model( "Member", memberSchema )

export default Member