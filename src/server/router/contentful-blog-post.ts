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
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.contentful.getEntry(input.id).then((res: any) => {
        return res;
      });
    },
  });
