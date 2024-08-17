import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const blog = await db.select().from(blogs).where(eq(blogs.id, id));

        if (blog) {
            return NextResponse.json({
                status: 200,
                data: blog
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: "Blog not found"
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        });
    }
}
