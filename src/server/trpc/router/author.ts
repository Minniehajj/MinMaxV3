import { router, publicProcedure } from "../trpc";
import { z } from "zod";

import { SIMPLE_GRAPHQL_FIELDS } from "vars/graphQLFields";
import { extractAuthors, extractPostEntriesFromAuthors } from "utils/extract";

export const authorRouter = router({
  getPostsPaginatedByAuthor: publicProcedure
    .input(
      z.object({
        author: z.union([z.string(), z.string().array()]),
        page: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const page = input?.page ?? 1;
      const parsedPageNumber = parseInt(page as unknown as string, 10);
      const queryLimit = parsedPageNumber === 1 ? 10 : 9;
      const skipMultiplier = parsedPageNumber === 1 ? 0 : parsedPageNumber - 1;
      const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;
      const entries = await ctx.graph.request(
        `query{
            authorCollection(where: { slug: "${
              input?.author
            }" }, limit: ${queryLimit}, skip: ${page === 1 ? skip : skip + 1}) {
              items {
                linkedFrom{
                  postCollection{
                    items{
                      ${SIMPLE_GRAPHQL_FIELDS}
                    }
                  }
                }
              }
            }
          }`
      );
      return extractPostEntriesFromAuthors(entries);
    }),
  getAuthors: publicProcedure.query(async ({ ctx }) => {
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
  getAuthorsBySlug: publicProcedure
    .input(
      z.object({
        author: z.union([z.string(), z.string().array()]),
      })
    )
    .query(async ({ ctx, input }) => {
      const entry = await ctx.graph.request(
        `query{
          authorCollection(where: { slug: "${input?.author}" }) {
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
