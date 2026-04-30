import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  token: string;
  userId: number;
  createdAt: string;
}

const SessionSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
