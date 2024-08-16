import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { userSchema } from "@/lib/validators/userSchema"; // Ensure correct schema is imported
import { users } from "@/lib/db/schema"; // Ensure correct schema is used

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

  let validatedData;

  try {
    validatedData = userSchema.parse({
      fname: data.fname,
      lname: data.lname,
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, message: error.message });
  }

  try {
    await db.insert(users).values({ ...validatedData });
    return NextResponse.json({
      status: 200,
      message: "User successfully stored in the database",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to store user in the database",
    });
  }
}
