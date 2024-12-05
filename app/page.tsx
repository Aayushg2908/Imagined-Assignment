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
        className="max-w-4xl mx-auto p-6"
      >
        <div className="max-w-2xl mx-auto">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          <motion.div layout className="mb-8 text-center">
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
