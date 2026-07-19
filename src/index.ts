import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

let todos: Todo[] = [
    { id: 1, title: "Learn Typescript", completed: false },
]

// GET all todos

app.get("/todos", (req: Request, res: Response) => {
    res.status(200).json(todos);
});

// post a new todo 
app.post("/todos", (req: Request, res: Response) => {
    const newTodo: Todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// delete a todo
app.delete("/todo/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos.splice(todoIndex, 1);

    return res.status(200).json({ message: "Todo deleted" });

});

app.put("/todo/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos[index].completed = completed;

    return res.status(200).json({
        message: "Todo updated",
        todo: todos[index]
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})