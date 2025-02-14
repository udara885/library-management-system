import mongoose from "mongoose"

const rentSchema = new mongoose.Schema( {
  memberId: {
    type: String,
    require: true
  },
  bookId: {
    type: String,
    require:true
  },
  fromDate: {
    type: Date,
    require: true
  },
  toDate: {
    type: Date,
    require: true
  }
} )

const Rent = mongoose.model( "Rent", rentSchema )

export default Rent