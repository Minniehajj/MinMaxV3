import { createRouter } from "./context";
import { z } from "zod";
import { PostProps } from "../../types";
import getReadTime from "../../utils/getReadTime";
import { POST_ENTRY_GRAPHQL_FIELDS, POST_GRAPHQL_FIELDS } from "vars/graphQLFields";
import { extractPost, extractPostEntries } from "utils/extract";

export const contentfulBlogPostRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAllPostsForHome", {
    input: z
      .object({
        page: z.number().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      const page = input?.page ?? 1;
      const parsedPageNumber = parseInt(page as unknown as string, 10);
      const queryLimit = parsedPageNumber === 1 ? 10 : 9;
      const skipMultiplier = parsedPageNumber === 1 ? 0 : parsedPageNumber - 1;
      const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;
      const entries = await ctx.graph.request(
        `query{
            postCollection(limit: ${queryLimit}, skip: ${skip}, order: publishDate_DESC) {
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }`
      );
      return extractPostEntries(entries);
    },
  })
  .query("getPost", {
    input: z.object({
      slug: z.union([z.string(), z.string().array()]),
    }),
    async resolve({ input, ctx }) {
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
    },
  });
