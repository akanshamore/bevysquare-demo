import Image from "next/image";
import { createTodo } from "./actions/toDoActions";
import TodoDetails from "@/components/TodoDetails";
import TodoList from "@/components/ToDoList";

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
  const initialTodos = await getTodos();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <Image src="/logo.png" alt="Logo" width={114} height={40} priority />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-[400px] bg-white p-6 rounded-lg shadow-lg">
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

            <TodoList initialTodos={initialTodos.todos} />
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <TodoDetails />
          </div>
        </div>
      </main>
    </div>
  );
}
