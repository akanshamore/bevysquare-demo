import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/Todo";
import connectDB from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const todos = await Todo.find().skip(skip).limit(limit);

    console.log("Todos:", todos);

    const total = await Todo.countDocuments();

    return NextResponse.json({
      todos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const todo = await Todo.create({
      title,
      description,
      date: new Date(),
    });

    return NextResponse.json(
      { message: "Todo created successfully", id: todo._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, title, description } = body;

    if (!id || (!title && !description)) {
      return NextResponse.json(
        { error: "ID and at least one field to update are required" },
        { status: 400 }
      );
    }

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      updatedAt: new Date(),
    };

    const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated successfully", todo });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
