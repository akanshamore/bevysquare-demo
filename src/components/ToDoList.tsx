import Link from "next/link";

export default function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <Link key={todo._id} href={`/todo/${todo._id}`}>
          <div className="todo-item">{todo.title}</div>
        </Link>
      ))}
    </div>
  );
}
