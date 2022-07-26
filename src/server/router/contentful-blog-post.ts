import { createRouter } from "./context";
import { z } from "zod";

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
  .query("getAllSlugs", {
    async resolve({ ctx }) {
      // return await ctx.prisma.example.findMany();
      return await ctx.contentful
        .getEntries({
          content_type: "post",
        })
        .then((res: { items: any[] }) => {
          return res.items.map((item: { fields: { slug: any } }) => {
            return item.fields.slug;
          });
        });
    },
  })
  .query("getPost", {
    input: z.object({
      slug: z.union([z.string(), z.string().array()]),
    }),
    async resolve({ input, ctx }) {
      console.log("FETCHING", input.slug[0]);
      const data = await ctx.contentful
        .getEntries({
          content_type: "post",
          "fields.slug": input.slug[0],
        })
        .then((res) => {
          return res;
        });
      console.log(data);
      return data;
      return await ctx.contentful
        .getEntries({
          content_type: "post",
          "fields.slug": input.slug[0],
        })
        .then((res: any) => {
          console.log(res);
          return JSON.stringify(res);
        });
    },
  });
