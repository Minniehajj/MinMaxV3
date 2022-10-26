// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { cardRouter } from "./card";
import { blogPostRouter } from "./blogPost";
import { authorRouter } from "./author";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  card: cardRouter,
  blogPost: blogPostRouter,
  author: authorRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
