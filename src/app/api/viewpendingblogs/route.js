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

    const res = NextResponse.json({
      status: 200,
      data: pendingBlogs,
    });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error fetching pending blogs",
    });
  }
}
