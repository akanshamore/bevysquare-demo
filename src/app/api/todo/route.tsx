import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("tododb");

    const todos = await db
      .collection("todos")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("todos").countDocuments();

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
    console.log("request");
    const body = await request.json();
    const { title, description } = body;

    console.log("Received data:", body);

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tododb");

    const todo = {
      title,
      description,
      date: new Date(),
    };

    const result = await db.collection("todos").insertOne(todo);

    return NextResponse.json(
      { message: "Todo created successfully", id: result.insertedId },
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
    const body = await request.json();
    const { id, title, description } = body;

    if (!id || (!title && !description)) {
      return NextResponse.json(
        { error: "ID and at least one field to update are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tododb");

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("todos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
