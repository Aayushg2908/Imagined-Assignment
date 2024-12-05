"use client";

import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { Calendar } from "@/components/Calendar";
import { useTodoStore } from "@/store/todoStore";
import { format } from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    editDescription,
    updateTodo,
  } = useTodoStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const todaysTodos = todos.filter((todo) => todo.date === formattedDate);

  const handleAddTodo = (text: string, description: string) => {
    addTodo(text, formattedDate, description);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto p-6"
      >
        <motion.div
          className="max-w-2xl mx-auto"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </motion.div>

          <motion.div layout className="mb-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={format(selectedDate, "MMMM-d")}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-gray-500 mb-1"
              >
                {format(selectedDate, "MMMM d") === format(new Date(), "MMMM d")
                  ? "Today"
                  : format(selectedDate, "MMMM d")}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h1
                key={format(selectedDate, "EEEE")}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-bold"
              >
                {format(selectedDate, "EEEE")}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <div className="relative m-4 flex justify-center items-center">
          <motion.div className="relative cursor-pointer" whileHover="hover">
            <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              <div className="px-4 py-1 bg-white rounded-full">
                <span className="text-sm font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Extra features
                </span>
              </div>
            </div>

            <motion.div
              className="absolute left-full top-0 ml-2 p-2 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -13 }}
              variants={{
                hover: { opacity: 1, y: -10 },
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-gray-600 whitespace-nowrap">
                <p className="mb-1">1. You can Swipe to delete a todo</p>
                <p className="mb-1">2. Press A to open the Add Todo Modal</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div layout className="px-4 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {todaysTodos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 py-8"
              >
                No tasks for{" "}
                {format(selectedDate, "MMMM d") === format(new Date(), "MMMM d")
                  ? "today"
                  : format(selectedDate, "MMMM d")}
                . Add one above!
              </motion.div>
            ) : (
              <motion.div
                key="todos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 p-4"
              >
                <AnimatePresence mode="popLayout">
                  {todaysTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={() => toggleTodo(todo.id)}
                      onDelete={() => deleteTodo(todo.id)}
                      onEdit={(text) => editTodo(todo.id, text)}
                      onEditDescription={(desc) =>
                        editDescription(todo.id, desc)
                      }
                      onUpdate={(updatedTodo) => updateTodo(updatedTodo)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <AddTodo onAdd={handleAddTodo} />
    </main>
  );
}
