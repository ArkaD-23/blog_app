import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";  
import { users } from "@/lib/db/schema"; 
import { eq } from "drizzle-orm";
import { updateUserSchema } from "@/lib/validators/updateUserSchema";
import bcryptjs from "bcryptjs";

export async function PATCH(req, { params }) {
  const { id } = params;

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
    validatedData = updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.errors[0].message, 
    });
  }

  if (validatedData.password) {
    validatedData.password = bcryptjs.hashSync(validatedData.password, 10);
  }

  try {
    const updatedUser = await db.update(users)
      .set(validatedData)
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    const {password, ...dataWithoutPass} = updatedUser[0];
    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
      data: dataWithoutPass,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
