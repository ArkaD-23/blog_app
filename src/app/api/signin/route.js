import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { userSchema } from "@/lib/validators/userSchema"; 
import { users } from "@/lib/db/schema"; 

export async function POST(req) {
  let data;

  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Invalid JSON data",
    });
  }

  const { email, password } = data;

  try {
    userSchema.pick({ email: true, password: true }).parse({
      email,
      password
    });
  } catch (error) {
    return NextResponse.json({ status: 400, message: error.message });
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json({
        status: 401,
        message: "User not found",
      });
    }

    const userData = user[0];

    const isPasswordValid = bcryptjs.compareSync(password, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        status: 401,
        message: "Invalid password",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Sign-in successful",
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to sign in",
    });
  }
}
