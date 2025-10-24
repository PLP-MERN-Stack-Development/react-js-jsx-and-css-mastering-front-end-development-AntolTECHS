import React, { useMemo, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([{ id: Date.now(), text, done: false }, ...tasks]);
    setText("");
  }

  const toggleDone = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const removeTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Task Manager</h2>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded dark:bg-gray-800"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "primary" : "secondary"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filtered.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                {task.text}
              </span>
            </label>
            <Button variant="danger" onClick={() => removeTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </ul>
    </Card>
  );
}
