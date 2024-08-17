import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogsSchema } from "@/lib/validators/blogsSchema";
import { blogs } from "@/lib/db/schema";

export async function POST(req) {
  let data;

  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Invalid JSON data",
    });
  }
  console.log(data);

  let validatedData;

  try {
    validatedData = blogsSchema.parse({
      title: data.title,
      author: data.author,
      content: data.content,
      status: data.status,
      userId: data.userId,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, message: error.message });
  }

  const blogData = {
    title: validatedData.title,
    author: validatedData.author,
    content: validatedData.content,
    status: validatedData.status,
    userId: validatedData.userId,
  };

  try {
    await db.insert(blogs).values(blogData);
    return NextResponse.json({
      status: 200,
      message: "Blog successfully stored in the database",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
