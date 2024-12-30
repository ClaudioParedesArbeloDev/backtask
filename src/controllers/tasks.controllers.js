import express from 'express';
import taskModel from '../model/task.model.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();


router.post('/', [
    body('title', 'Titulo es requerido').isLength({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;

    try {
        const newTask = new taskModel({ title, description });
        await newTask.save();
        res.status(201).json({ message: "Tarea creada", task: newTask });
    } catch (error) {
        console.error("Error creando la tarea", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    const {status} = req.query;

    try {
        let tasks;
        if (status === 'true'){
            tasks = await taskModel.find({status: true});
       } else if (status === 'false') {
            tasks = await taskModel.find({ status: false }); 
        } else {
            tasks = await taskModel.find(); 
        }
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener las tareas", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await taskModel.findById(_id );
        res.status(200).json(task);
    } catch (error) {
        console.error("Error al obtener la tarea", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const updates = { ...req.body };
        const updateTask = await taskModel.findByIdAndUpdate(_id, updates, { new: true });
        res.status(200).json({ message: "Tarea actualizada", task: updateTask });
        } catch (error) {
            console.error("Error al actualizar la tarea", error);
            res.status(500).json({ message: 'Internal server error' });
        }
});

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteTask = await taskModel.findByIdAndDelete(_id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Tarea no encontrada" });
            }
        res.status(200).json({ message: "Tarea eliminada", task: deleteTask });
    } catch (error) {
        console.error("Error al eliminar la tarea", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
        



export default router;