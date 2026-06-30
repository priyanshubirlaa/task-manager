const tasks = require("../data/tasks");

exports.getTasks = (req, res) => {
    res.json(tasks);
};

exports.createTask = (req, res) => {

    const { title } = req.body;

    const task = {
        id: Date.now(),
        title,
        status: "Pending"
    };

    tasks.push(task);

    res.status(201).json(task);

};

exports.updateTask = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.status = "Completed";

    res.json(task);

};

exports.deleteTask = (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    tasks.splice(index, 1);

    res.json({
        message: "Task deleted successfully"
    });

};