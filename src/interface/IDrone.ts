import { Document } from 'mongoose';
import IMedication from './IMedication';

export default interface IDrone extends Document {
  serialNumber: string;
  model: 'Lightweight' | 'Middleweight' | 'Cruiserweight' | 'Heavyweight';
  weightLimit: number;
  batteryCapacity: number;
  state: 'IDLE' | 'LOADING' | 'LOADED' | 'DELIVERING' | 'DELIVERED' | 'RETURNING';
  medicationId: IMedication['_id'];
}
