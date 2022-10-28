import { CardImage } from "components/atoms/CardImage";
import { Hero } from "components/atoms/Hero";
import Link from "next/link";
import React, { Key } from "react";
import { graph } from "server/db/client";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import superjson from "superjson";
import { PostProps } from "types";
import { trpc } from "utils/trpc";

import * as Avatar from "@radix-ui/react-avatar";
import { TimerIcon } from "@radix-ui/react-icons";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
interface PageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  setBackgroundImage: (image: string) => void;
}

const PaginatedBlogPage = (props: PageProps) => {
  const postsQuery = trpc.blogPost.getPostsPaginated.useQuery({
    page: props.page as string,
  });
  const { data, isLoading, error } = postsQuery;
  if (!data || isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post, index: Key) => {
          return (
            <div key={index} className="relative mb-4">
              <Link href={"/" + post.slug} className="group">
                <CardImage
                  {...post.heroImage}
                  alt={post.title}
                  setBackgroundImage={props.setBackgroundImage}
                />
                <h2 className="mt-2 text-center text-2xl font-bold">
                  {post.title}
                </h2>
                <div className="mt-2"></div>
                <p className="flex items-center justify-center gap-2 text-sm">
                  <TimerIcon />
                  {post.readTime} minute read
                </p>
                <div className="mt-2" />
                <div className="flex items-center justify-center gap-4">
                  {post.authorsCollection.items?.map(
                    (
                      author: {
                        image: { url: string | undefined };
                        title: string;
                      },
                      index: Key
                    ) => {
                      return (
                        <p
                          className="flex items-center justify-center gap-4 text-sm"
                          key={index}
                        >
                          <Avatar.Root>
                            <Avatar.Image
                              className="my-0 w-12 rounded-full"
                              src={author.image.url}
                            ></Avatar.Image>
                          </Avatar.Root>
                          {author.title}
                        </p>
                      );
                    }
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PaginatedBlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await graph.request(
    `query{
          postCollection(where: { slug_exists: true }) {
              items {
                slug
              }
            }
          }`
  );
  const totalPosts = entries?.postCollection?.items?.length;
  const totalPages = Math.ceil(totalPosts / 9);
  const paths = [];
  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   const allTags = (await getAllTags(preview)) ?? []
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });
  const slug = params?.slug || [];

  await ssg.blogPost.getPostsPaginated.fetch({ page: params?.page as string });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
      page: params?.page,
    },
    revalidate: 1,
  };
};
