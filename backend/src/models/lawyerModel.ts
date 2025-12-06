import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  approved: { type: Boolean, default: false },
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

export default Lawyer;
