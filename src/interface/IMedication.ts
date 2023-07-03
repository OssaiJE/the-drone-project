import { Document } from 'mongoose';
import IDrone from './IDrone';

export default interface IMedication extends Document {
  name: string;
  weight: number;
  code: string;
  image: string;
  droneId: IDrone['_id'];
}
