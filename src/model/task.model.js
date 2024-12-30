import mongoose from 'mongoose';

const taskCollection = 'tasks';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    status: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
});

mongoose.set('strictQuery', false);

const taskModel = mongoose.model(taskCollection, taskSchema);

export default taskModel;