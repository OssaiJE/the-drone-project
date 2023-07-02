import { Schema, model } from 'mongoose';

// Drone Model
const droneSchema = new Schema({
  serialNumber: {
    type: String,
    maxlength: 100,
    required: true
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
  }
});

const Drone = model('Drone', droneSchema);

export default Drone;
