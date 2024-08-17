import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db'; 
import { blogs , users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { id, status, userId } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ status: 400, message: "Missing id or status" });
    }

    const updatedBlog = await db.update(blogs)
      .set({ status })
      .where(eq(blogs.id, id))
      .returning();

    if (updatedBlog.length === 0) {
      return NextResponse.json({ status: 404, message: "Blog not found" });
    }

    const user = await db.select().from(users).where(eq(users.id, userId));
    const updatedBlogsMap = { ...user.blog_ids, [blogId]: status };
    await db
    .update(users)
    .set({ blog_ids: updatedBlogsMap })
    .where(eq(users.id, userId));

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
