import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { blogs } from "@/lib/db/schema";

export async function GET() {
  try {
    const acceptedBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.status, "accepted"));

    return NextResponse.json({
      status: 200,
      data: acceptedBlogs,
    });

  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
