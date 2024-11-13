import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user?._id;
  try {
    const newTask = new Task({ title, description, userId });
    await newTask.save();
    res.status(200).send(newTask);
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to create task" });
  }
};

export const getAllTasks = async (req, res) => {
  // console.log("test");
  try {
    const tasks = await Task.find({ userId: req.user?._id });
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to get tasks" });
  }
};
export const getGivenTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res.status(200).send(task);
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to get given task" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  //   console.log(req.user._id);
  try {
    const task = await Task.findById(id);

    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to delete task" });
  }
};
