import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  branch : {
    type:String
  },
  skills: {
    type: String,
    required: true,
  },
  img: {
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Student = mongoose.model("Students", studentSchema);
export default Student;
