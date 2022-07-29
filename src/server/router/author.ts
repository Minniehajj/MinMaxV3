import { createRouter } from "./context";
import { z } from "zod";
import { POST_ENTRY_GRAPHQL_FIELDS, POST_GRAPHQL_FIELDS } from "vars/graphQLFields";
import { extractAuthors, extractPost, extractPostEntries } from "utils/extract";

export const authorRouter = createRouter()
  .query("getPostsByAuthor", {
    input: z
      .object({
        page: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
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
    },
  })
  .query("getAuthors", {
    async resolve({ input, ctx }) {
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
    },
  });
