import mongoose, { Schema, Document } from 'mongoose';

export interface ISubtask {
  text: string;
  done: boolean;
}

export interface ITask extends Document {
  id: number;
  title: string;
  bucket: string;
  status: string;
  completedOn: string;
  subtasks: ISubtask[];
}

const SubtaskSchema: Schema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
}, { _id: false });

const TaskSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  bucket: { type: String, required: true },
  status: { type: String, required: true },
  completedOn: { type: String, default: 'Not finished' },
  subtasks: { type: [SubtaskSchema], default: [] },
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
