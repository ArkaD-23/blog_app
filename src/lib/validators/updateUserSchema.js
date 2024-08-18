import { z } from "zod";

export const updateUserSchema = z.object({
    fname: z.string({ message: "First name should be a non-empty string" }).min(3, {message: "Atleast 3 characters required"}).optional(),
    lname: z.string({ message: "Last name should be a non-empty string" }).min(3 ,{message: "Atleast 3 characters required"}).optional(),
    username: z.string({ message: "Username should be a non-empty string" }).min(3 ,{message: "Atleast 3 characters required"}).optional(),
    email: z.string().email({ message: "Email should be of correct format" }).min(3 ,{message: "Atleast 3 characters required"}).optional(),
    password: z.string().min(8, { message: "Password should be at least 8 characters long" }).optional(),
});
