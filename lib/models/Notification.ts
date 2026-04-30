import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  id: number;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

const NotificationSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: String, required: true },
});

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
