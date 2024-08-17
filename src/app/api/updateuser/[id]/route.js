// app/api/user/[id]/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  const cookies = req.cookies; 
  const token = cookies.get('access_token')?.value;
  const {id} = params;

  if (!token) {
    return NextResponse.json({ status: 401, message: "Not authenticated!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (userId !== id) {
      return NextResponse.json({ status: 401, message: "You can delete only your own account!" });
    }

    const result = await db
      .delete(users)
      .where(eq(users.id, id));

    if (result.rowCount === 0) {
      return NextResponse.json({ status: 404, message: "User not found!" });
    }

    const response = NextResponse.json({ status: 200, message: "User has been deleted!" });
    response.cookies.set('access_token', '', { httpOnly: true, path: '/', expires: new Date(0) }); 
    return response;

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ status: 500, message: error.message || "Something went wrong!" });
  }
}
