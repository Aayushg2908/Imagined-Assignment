import { motion } from "framer-motion";
import { Pencil, Trash2, Check } from "lucide-react";
import { Todo } from "@/store/todoStore";
import { useState } from "react";
import { EditTodoModal } from "./EditTodoModal";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
  onToggle: (id: string) => void;
  onEdit?: (text: string) => void;
  onEditDescription?: (desc: string) => void;
}

export const TodoItem = ({
  todo,
  onDelete,
  onUpdate,
  onToggle,
  onEdit,
  onEditDescription,
}: TodoItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-start gap-4 bg-white p-4 rounded-xl hover:cursor-pointer shadow-md"
      >
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 relative w-5 h-5 border-2 rounded-full border-gray-300 hover:border-black transition-colors group"
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black rounded-full"
            >
              <Check size={14} className="text-white" />
            </motion.div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-sm ${
                todo.completed ? "line-through text-gray-400" : "text-gray-500"
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} className="text-red-500" />
          </motion.button>
        </div>
      </motion.div>

      <EditTodoModal
        todo={todo}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedTodo) => {
          onUpdate?.(updatedTodo);
          onEdit?.(updatedTodo.title);
          onEditDescription?.(updatedTodo.description || "");
        }}
      />
    </>
  );
};
