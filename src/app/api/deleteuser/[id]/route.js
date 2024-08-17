import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  const token = req.cookies.get("access_token");
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

    await db
      .delete(users)
      .where(eq(users.id, id));

    const response = NextResponse.json({ status: 200, message: "User has been deleted!" });
    response.headers.set('Set-Cookie', `access_token=; HttpOnly; Path=/;`);
    return response;

  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
