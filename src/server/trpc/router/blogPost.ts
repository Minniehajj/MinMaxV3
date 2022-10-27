import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import { POST_ENTRY_GRAPHQL_FIELDS, POST_GRAPHQL_FIELDS } from "vars/graphQLFields";
import { extractPost, extractPostEntries } from "utils/extract";

export const blogPostRouter = router({
  getPost: publicProcedure
    .input(z.object({
      slug: z.union([z.string(), z.string().array()])
    }))
    .query(async ({ input, ctx }) => {
      const preview = false;
      const entry = await ctx.graph.request(
        `query{
          postCollection(where: { slug: "${input.slug}" }, preview: ${preview ? "true" : "false"}, limit: 1) {
              items {
                ${POST_GRAPHQL_FIELDS}
                ${POST_ENTRY_GRAPHQL_FIELDS}
              }
            }
          }`
      );
      return extractPost(entry);
    }),
  getPostsPaginated: publicProcedure
    .input(z
      .object({
        page: z.string().nullish(),
      })
      .nullish())
    .query(async ({ input, ctx }) => {
      const page = input?.page ?? 1;
      const parsedPageNumber = parseInt(page as string, 10);
      const queryLimit = parsedPageNumber === 1 ? 10 : 9;
      const skipMultiplier = parsedPageNumber === 1 ? 0 : parsedPageNumber - 1;
      const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;      
      const entries = await ctx.graph.request(
        `query{
            postCollection(limit: ${queryLimit}, skip: ${page === 1 ? skip : skip + 1}, order: publishDate_DESC) {
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }`
      );
      return extractPostEntries(entries);
    }),
});
