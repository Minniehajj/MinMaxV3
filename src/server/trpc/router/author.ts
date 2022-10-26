import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import { POST_GRAPHQL_FIELDS } from "vars/graphQLFields";
import { extractAuthors, extractPostEntries } from "utils/extract";

export const authorRouter = router({
  getPostsByAuthor: publicProcedure
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
  getAuthors: publicProcedure
    .query(async ({ ctx }) => {
      const entry = await ctx.graph.request(
        `query{
          authorCollection(order: sys_firstPublishedAt_DESC) {
              items {
                title
                slug
                authorType               
                bio
                twitter
                image {
                  title
                  url
                  width
                  height
                }
              }
            }
          }`
      );
      return extractAuthors(entry);
    }),
});
