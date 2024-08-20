import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema"; 
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const pendingBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.status, "pending"));

    return NextResponse.json({
      status: 200,
      data: pendingBlogs,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error fetching pending blogs",
    });
  }
}

export const revalidate = 0;
