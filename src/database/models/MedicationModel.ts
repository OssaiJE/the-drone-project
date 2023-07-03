import { Schema, model } from 'mongoose';
import IMedication from '../../interface/IMedication';

// Medication Model
const medicationSchema = new Schema<IMedication>({
  name: {
    type: String,
    match: /^[A-Za-z0-9-_]+$/
  },
  weight: {
    type: Number
  },
  code: {
    type: String,
    match: /^[A-Z0-9_]+$/
  },
  image: {
    type: String
  },
  droneId: {
    type: Schema.Types.ObjectId,
    ref: 'Drone',
    required: true
  }
});

const Medication = model('Medication', medicationSchema);

export default Medication;
