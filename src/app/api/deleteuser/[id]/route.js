import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req, { params }) {
  const {id} = params;

  try {
    await db
      .delete(users)
      .where(eq(users.id, id));

    const res = NextResponse.json({ status: 200, message: "User has been deleted!" });
    res.cookies.set("access_token", "", {
      expires: new Date(0),
    });
    return res;

  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
