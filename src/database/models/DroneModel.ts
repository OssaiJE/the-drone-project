import { Schema, model } from 'mongoose';
import IDrone from 'src/interface/IDrone';

// Drone Model
const droneSchema = new Schema<IDrone>({
  serialNumber: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  },
  model: {
    type: String,
    enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight']
  },
  weightLimit: {
    type: Number,
    max: 500
  },
  batteryCapacity: {
    type: Number,
    min: 0,
    max: 100
  },
  state: {
    type: String,
    enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
  },
  medicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Medication'
  }
});

const Drone = model('Drone', droneSchema);

export default Drone;
