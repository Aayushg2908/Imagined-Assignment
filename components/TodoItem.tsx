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
        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
        className="flex items-start gap-4 bg-white p-4 rounded-xl hover:cursor-pointer shadow-sm"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => onToggle(todo.id)}
          className="mt-1 relative w-5 h-5 border-2 rounded-full border-gray-300 hover:border-black transition-colors group"
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center bg-black rounded-full"
            >
              <Check size={14} className="text-white" />
            </motion.div>
          )}
        </motion.button>

        <motion.div
          className="flex-1 min-w-0"
          animate={{ opacity: todo.completed ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>

        <div className="flex gap-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            <Pencil size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
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
