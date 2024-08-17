import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema"; 
import { eq } from "drizzle-orm";

export async function GET(req, {params}) {
  const {id} = params;
  try {
    const userBlogs = await db.select().from(blogs).where(eq(blogs.userId, id));
    console.log(userBlogs);
    return NextResponse.json({
      status: 200,
      data: userBlogs,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
