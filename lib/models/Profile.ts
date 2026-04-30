import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  userId: number;
  bio: string;
  avatarUrl: string;
  interests: string;
  notificationsEnabled: boolean;
  blockedUsers: string[];
}

const ProfileSchema: Schema = new Schema({
  userId: { type: Number, required: true, unique: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  interests: { type: String, default: '' },
  notificationsEnabled: { type: Boolean, default: true },
  blockedUsers: { type: [String], default: [] },
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
