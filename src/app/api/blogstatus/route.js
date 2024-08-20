import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db'; 
import { blogs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { id, status, remarks } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ status: 400, message: "Missing id or status" });
    }

    const updatedBlog = await db.update(blogs)
      .set({ status , remarks })
      .where(eq(blogs.id, id))
      .returning();

    if (updatedBlog.length === 0) {
      return NextResponse.json({ status: 404, message: "Blog not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Blog status updated successfully",
      data: updatedBlog[0],
    });
  } catch (error) {
    console.error('Error updating blog status:', error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export const revalidate = 0;
