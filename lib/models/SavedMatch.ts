import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedMatch extends Document {
  id: number;
  name: string;
  course: string;
  summary: string;
  interests: string[];
  savedAt: string;
}

const SavedMatchSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  summary: { type: String, required: true },
  interests: { type: [String], default: [] },
  savedAt: { type: String, required: true },
});

export default mongoose.models.SavedMatch || mongoose.model<ISavedMatch>('SavedMatch', SavedMatchSchema);
