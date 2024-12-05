import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  id: string;
  title: string;
  completed?: boolean;
  date?: string;
  description?: string;
  createdAt?: Date;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, date: string, description: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  editDescription: (id: string, description: string) => void;
  updateTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title, date, description) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Math.random().toString(36).substring(2),
              title,
              completed: false,
              date,
              description,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, title) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title } : todo
          ),
        })),
      editDescription: (id, description) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, description } : todo
          ),
        })),
      updateTodo: (updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);
