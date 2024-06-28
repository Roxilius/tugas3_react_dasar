/* eslint-disable react/prop-types */
import { Trash2 } from "lucide-react";
import Button from "./Button";
import { Pencil } from "lucide-react";
const TasksButton = ({ task, onClick, onDelete, onEdit }) => {
  return (
    <Button
      className={`relative flex flex-col p-5 gap-0 !text-black text-center ${
        task.present
          ? "!bg-green-200 hover:!bg-green-300"
          : "!bg-red-200 hover:!bg-red-300"
      } rounded-xl`}
      onClick={() => onClick(task)}
    >
      <h1 className="text-2xl">
        {task.name} - {task.reps} x {task.set}
      </h1>
      <button
        className="absolute right-0 top-0 p-2"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task);
        }}
      >
        <Trash2 size={20} color="red"/>
      </button>
      <button
        className="absolute right-0 top-9 p-2"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(task);
        }}
      >
        <Pencil size={20} color="blue"/>
      </button>
    </Button>
  );
};

export default TasksButton;
