"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTodoId = searchParams.get("selectedTodo");

  const handleTodoSelect = (todoId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("selectedTodo", todoId);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Your Todos</h3>
      {initialTodos.map((todo: Todo) => {
        const isSelected = todo._id === selectedTodoId;

        return (
          <div
            key={todo._id}
            className={`p-4 rounded-lg mb-4 cursor-pointer transition-colors ${
              isSelected
                ? "border border-black bg-white"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => handleTodoSelect(todo._id)}
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
        );
      })}

      <div className="flex justify-between mt-6">
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
          Previous
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
