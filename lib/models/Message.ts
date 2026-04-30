import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  id: number;
  sender: string;
  text: string;
  time: string;
}

const MessageSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  sender: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
