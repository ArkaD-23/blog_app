import { z } from "zod";

export const blogsSchema = z.object({
  title: z.string().max(100, { message: "Blog title must be 100 characters or less" }),
  author: z.string().max(100, { message: "Author name must be 100 characters or less" }),
  content: z.string().max(2000, { message: "Blog content must be 600 characters or less" }),
  status: z.enum(["accepted", "rejected", "pending"], { message: "Role should be either 'accepted' , 'rejected' or 'pending'" }),
  userId: z.string().max(50, {message: "Id must be 50 characters or less"}),
});
