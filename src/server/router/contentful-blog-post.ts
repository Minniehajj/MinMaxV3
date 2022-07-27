import { createRouter } from "./context";
import { z } from "zod";
import { PostProps } from "../../types";
import getReadTime from "../../utils/getReadTime";

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
  .query("getAllPostsForHome", {
    input: z
      .object({
        page: z.number().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      // return await ctx.prisma.example.findMany();
      const page = input?.page ?? 0;
      return await ctx.contentful
        .getEntries({
          content_type: "post",
          limit: 10,
          skip: page * 10,
        })
        .then((res: { items: { fields: PostProps }[] }) => {
          return res.items.map((item) => {
            if (item.fields?.pageBody) {
              item.fields.readTime = getReadTime(JSON.stringify(item.fields?.pageBody));
            }
            return {
              slug: item.fields.slug,
              title: item.fields.title,
              heroImage: {
                src: "https:" + item.fields.heroImage?.fields?.file?.url,
                alt: item.fields.heroImage?.fields?.title ?? "",
                width: item.fields.heroImage?.fields?.file?.details?.image?.width,
                height: item.fields.heroImage?.fields?.file?.details?.image?.height,
              },
              publishDate: item.fields.publishDate,
              authors: item.fields.authors,
              metaDescription: item.fields.metaDescription,
              tags: item.fields.tags,
              readTime: item.fields.readTime,
            };
          });
        });
    },
  })
  .query("getPost", {
    input: z.object({
      slug: z.union([z.string(), z.string().array()]),
    }),
    async resolve({ input, ctx }) {
      return await ctx.contentful
        .getEntries({
          content_type: "post",
          limit: 1,
          "fields.slug": input.slug[0],
        })
        .then(
          (res: {
            items: {
              fields: PostProps;
            }[];
          }) => {
            return res.items.map((item) => {
              if (item.fields?.pageBody) {
                item.fields.readTime = getReadTime(JSON.stringify(item.fields?.pageBody));
              }
              return {
                slug: item.fields.slug,
                title: item.fields.title,
                heroImage: {
                  src: "https:" + item.fields.heroImage?.fields?.file?.url,
                  alt: item.fields.heroImage?.fields?.title ?? "",
                  width: item.fields.heroImage?.fields?.file?.details?.image?.width,
                  height: item.fields.heroImage?.fields?.file?.details?.image?.height,
                },
                publishDate: item.fields.publishDate,
                authors: item.fields.authors,
                metaDescription: item.fields.metaDescription,
                tags: item.fields.tags,
                pageBody: item.fields.pageBody,
                readTime: item.fields.readTime,
              };
            });
          }
        );
    },
  });
