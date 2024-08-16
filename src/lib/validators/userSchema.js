import { z } from "zod";

export const userSchema = z.object({
    fname: z.string().nonempty({ message: "First name should be a non-empty string" }),
    lname: z.string().nonempty({ message: "Last name should be a non-empty string" }),
    username: z.string().nonempty({ message: "Username should be a non-empty string" }),
    email: z.string().email({ message: "Email should be of correct format" }),
    password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    role: z.enum(["user", "admin"], { message: "Role should be either 'user' or 'admin'" }),
});
