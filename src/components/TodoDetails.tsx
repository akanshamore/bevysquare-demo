"use client";
import { updateTodo } from "@/app/actions/toDoActions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function TodoDetails() {
  const searchParams = useSearchParams();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const selectedTodoId = searchParams.get("selectedTodo");

  useEffect(() => {
    if (selectedTodoId) {
      fetch(`/api/todo/${selectedTodoId}`)
        .then((res) => res.json())
        .then((data) => setSelectedTodo(data));
    }
  }, [selectedTodoId]);

  return (
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
          <p className="text-gray-500 text-center">Select a todo to edit</p>
        )}
      </div>
    </div>
  );
}
