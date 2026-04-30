import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  id: number;
  reporter: string;
  reportedUser: string;
  reason: string;
  timestamp: string;
}

const ReportSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  reporter: { type: String, required: true },
  reportedUser: { type: String, required: true },
  reason: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
