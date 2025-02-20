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
    type: String,
    require: true
  },
  toDate: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: "Not returned"
  }
} )

const Rent = mongoose.model( "Rent", rentSchema )

export default Rent