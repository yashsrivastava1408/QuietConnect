import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendRequest extends Document {
  id: number;
  from: string;
  course: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const FriendRequestSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  from: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.models.FriendRequest || mongoose.model<IFriendRequest>('FriendRequest', FriendRequestSchema);
