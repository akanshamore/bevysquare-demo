"use client";
import Image from "next/image";
import { createTodo } from "./actions/toDoActions";
import { useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

async function getTodos(page = 1, limit = 10) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/todo?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home() {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const initialTodos = await getTodos();

  console.log("Initial Todos:", initialTodos);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <Image src="/logo.png" alt="Logo" width={114} height={40} priority />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Todo</h2>
            <form action={createTodo} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Todo Title"
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                name="description"
                placeholder="Todo Description"
                required
                className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Add Todo
              </button>
            </form>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Your Todos</h3>
              {initialTodos.todos.map((todo: Todo) => (
                <div
                  key={todo._id}
                  className="bg-gray-50 p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <h4 className="font-semibold">{todo.title}</h4>
                  <div className="mt-2">
                    <p className="text-gray-600">{todo.description}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(todo.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                  Previous
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Todo Details</h2>
            <div>
              {selectedTodo ? (
                <form action={updateTodo} className="space-y-4">
                  <input type="hidden" name="id" value={selectedTodo._id} />
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedTodo.title}
                    placeholder="Update Title"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <textarea
                    name="description"
                    defaultValue={selectedTodo.description}
                    placeholder="Update Description"
                    className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                  >
                    Update Todo
                  </button>
                </form>
              ) : (
                <p className="text-gray-500 text-center">
                  Select a todo to edit
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
