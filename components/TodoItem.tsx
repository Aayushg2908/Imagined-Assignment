import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
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
  const x = useMotionValue(0);
  const dragThreshold = 200;
  const deleteThreshold = dragThreshold * 1.2;

  const opacity = useTransform(
    x,
    [-dragThreshold, 0, dragThreshold],
    [0.3, 1, 0.3]
  );
  const background = useTransform(
    x,
    [
      -dragThreshold,
      -dragThreshold * 0.8,
      0,
      dragThreshold * 0.8,
      dragThreshold,
    ],
    [
      "rgba(239, 68, 68, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(239, 68, 68, 1)",
    ]
  );

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.x) > deleteThreshold) {
      onDelete(todo.id);
    }
  };

  return (
    <>
      <motion.div
        layout
        style={{ x, background }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
        className="flex items-start gap-4 bg-white p-4 rounded-xl hover:cursor-pointer shadow-sm relative"
      >
        <motion.div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center text-red-500 opacity-0">
          <Trash2 size={20} />
        </motion.div>
        <motion.div className="absolute inset-y-0 right-0 w-16 flex items-center justify-center text-red-500 opacity-0">
          <Trash2 size={20} />
        </motion.div>
        <motion.div
          className="flex items-start gap-4 w-full"
          style={{ opacity }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => onToggle(todo.id)}
            className="relative w-5 h-5 border-2 rounded-full border-gray-300 hover:border-black transition-colors group mt-0.5"
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
            <div className="min-w-0">
              <h3
                className={`font-medium truncate ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`mt-1 text-sm ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </motion.div>

          <div className="flex items-center gap-1 ml-4 flex-shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Pencil size={16} className="flex-shrink-0" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center"
            >
              <Trash2 size={16} className="flex-shrink-0" />
            </motion.button>
          </div>
        </motion.div>
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
