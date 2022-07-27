// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { contentfulBlogPostRouter } from "./contentful-blog-post";
import { cardRouter } from "./card";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogpost.", contentfulBlogPostRouter)
  .merge("card.", cardRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
