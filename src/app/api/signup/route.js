import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import bcryptjs from "bcryptjs"
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
    return NextResponse.json({ status: 400, message: error.errors[0].message });
  }

  const hashedPassword = bcryptjs.hashSync(validatedData.password, 10);

  const userData = {
    fname: validatedData.fname,
    lname: validatedData.lname,
    username: validatedData.username,
    email: validatedData.email,
    password: hashedPassword, 
    role: validatedData.role,
  };

  try {
    await db.insert(users).values(userData);
    return NextResponse.json({
      status: 200,
      message: "User successfully stored in the database",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
