import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { userSchema } from "@/lib/validators/userSchema"; 
import { users } from "@/lib/db/schema"; 

export async function PUT(req , {params}) {
  let data;
  const {id} = params;

  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Invalid JSON data",
    });
  }

  const { fname, lname, username, email, password } = data;

  try {
    userSchema.partial().parse({
      fname,
      lname,
      username,
      email,
      password,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, message: error.message });
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const existingUser = user[0];

    const updatedData = {
      id: id,
      fname: fname || existingUser.fname,
      lname: lname || existingUser.lname,
      username: username || existingUser.username,
      email: email || existingUser.email,
    };

    if (password) {
      updatedData.password = bcryptjs.hashSync(password, 10);
    }

    await db
      .update(users)
      .set(updatedData)
      .where(eq(users.id, id))
      .execute();

    return NextResponse.json({
      status: 200,
      message: "User successfully updated",
      data: updatedData
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update user",
    });
  }
}
