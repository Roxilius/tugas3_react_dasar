/* eslint-disable no-unused-vars */
import { useState } from "react";
import TasksButton from "../components/TasksButton";
import { Plus } from "lucide-react";
import Button from "../components/Button";
import { useEffect } from "react";

const initialTasks = [
  {
    id: 1,
    name: "Push Up",
    reps: 20,
    set: 4,
    present: false,
  },
  {
    id: 2,
    name: "Pull Up",
    reps: 10,
    set: 4,
    present: false,
  },
  {
    id: 3,
    name: "Squad",
    reps: 10,
    set: 4,
    present: false,
  },
  {
    id: 4,
    name: "Sit Up",
    reps: 25,
    set: 4,
    present: false,
  },
  {
    id: 5,
    name: "Hand Stand Push Up",
    reps: 5,
    set: 4,
    present: false,
  },
];
const savedTasks = localStorage.getItem("tasks");

export default function Home() {
  const [tasks, setTasks] = useState(
    savedTasks ? JSON.parse(savedTasks) : initialTasks
  );
  const [editTask, setEditTask] = useState();

  function handleClick(task) {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              present: !t.present,
            }
          : t
      )
    );
  }
  function handleDelete(task) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  }
  function handleEdit(task) {
    setEditTask(task);
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  return (
    <main className="flex flex-col h-screen p-5 gap-2">
      <h1 className="text-4xl text-center">My Tasks</h1>
      <div className="flex gap-2 justify-center ">
        <Button
          className={`rounded-2xl bg-green-500`}
          onClick={() => setEditTask({ present: false })}
        >
          <Plus /> Tambah
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="w-2/4">
          <h1 className="bg-red-600 text-2xl text-center font-bold">
            Not Done
          </h1>
          <div className="flex flex-col gap-2 p-5">
            {tasks
              .filter((task) => !task.present)
              .map((task) => (
                <TasksButton
                  key={task.id}
                  task={task}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>
        <div className="w-2/4">
          <h1 className="bg-green-600 text-2xl text-center font-bold">Done</h1>
          <div className="flex flex-col gap-2 p-5">
            {tasks
              .filter((task) => task.present)
              .map((task) => (
                <TasksButton
                  key={task.id}
                  task={task}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>
      </div>
      {editTask && (
        <div>
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <form className="bg-white p-8 rounded flex flex-col gap-4">
              <h1 className="text-xl">Tambah Tasks</h1>
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={editTask.name}
                  onChange={(e) => {
                    setEditTask({ ...editTask, name: e.target.value });
                  }}
                  placeholder="Nama"
                  autoFocus
                  required
                  className="border border-black rounded p-1"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label htmlFor="ser">Reps</label>
                  <input
                    type="number"
                    id="reps"
                    name="reps"
                    value={editTask.reps}
                    required
                    onChange={(e) => {
                      setEditTask({ ...editTask, reps: e.target.value });
                    }}
                    className="border border-black rounded p-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="set">Set</label>
                  <input
                    type="number"
                    id="set"
                    name="set"
                    value={editTask.set}
                    required
                    onChange={(e) => {
                      setEditTask({ ...editTask, set: e.target.value });
                    }}
                    className="border border-black rounded p-1"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setEditTask()}>Batal</Button>
                <Button
                  onClick={() => {
                    if (editTask.id) {
                      setTasks(
                        tasks.map((t) => (t.id === editTask.id ? editTask : t))
                      );
                    } else {
                      setTasks([
                        ...tasks,
                        { id: tasks.length + 1, ...editTask },
                      ]);
                    }
                    setEditTask();
                  }}
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
