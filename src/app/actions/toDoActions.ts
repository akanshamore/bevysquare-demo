"use server";

export async function createTodo(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/todo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }
  );

  return response.json();
}

export async function updateTodo(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const id = formData.get("id");

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/todo/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    }
  );

  return response.json();
}
