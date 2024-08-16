import { z } from "zod";

export const blogSchema = z.object({
  blogtitle: z.string().max(100, { message: "Blog title must be 100 characters or less" }),
  authorname: z.string().max(100, { message: "Author name must be 100 characters or less" }),
  blogcontent: z.string().max(600, { message: "Blog content must be 600 characters or less" }),
});
