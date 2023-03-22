import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React, { Key, useEffect } from "react";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import { extractAuthorSlugs } from "utils/extract";
import superjson from "superjson";
import { trpc } from "utils/trpc";

import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";

import { graph } from "server/db/client";

import Link from "next/link";
import { CardImage } from "components/atoms/CardImage";
import { Pagination } from "components/organisms/Pagination";

interface PageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  setBackgroundImage: (image: string) => void;
}
const Page = (props: PageProps) => {
  const { slug } = props;
  const postsQuery = trpc.author.getPostsPaginatedByAuthor.useQuery({
    page: props.page as number,
    author: slug as string,
  });
  const authorsQuery = trpc.author.getAuthorsBySlug.useQuery({
    author: slug as string,
  });
  const { data, isLoading, error } = postsQuery;
  const {
    data: authors,
    isLoading: authorsLoading,
    error: authorsError,
  } = authorsQuery;
  if (!data || isLoading || !authors || authorsLoading) {
    return <div>Loading...</div>;
  }
  if (error || authorsError) {
    return <div>{error?.message || authorsError?.message}</div>;
  }
  return (
    <main className="pt-2 pb-12">
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
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
                  {authors?.map((author, index: Key) => {
                    return (
                      <p
                        className="flex items-center justify-center gap-4 text-sm"
                        key={index}
                      >
                        <Avatar.Root>
                          <Avatar.Image
                            className="my-0 aspect-square w-12 rounded-full object-cover object-top"
                            src={author.image.url}
                          ></Avatar.Image>
                        </Avatar.Root>
                        {author.title}
                      </p>
                    );
                  })}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination pages={props.totalPages} currentPage={props.page as number} />
    </main>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  let slugs: { params: { slug: string[] } }[] = [];

  const entry = await graph.request(
    `query{
          authorCollection(where: { slug_exists: true }) {
              items {
                slug
              }
            }
          }`
  );
  slugs = extractAuthorSlugs(entry);

  return {
    paths: slugs,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const slug = context?.params?.slug || [];
  const page = context?.params?.page || 1;
  if (slug.length === 0) {
    return {
      notFound: true,
    };
  }
  const authorPosts = await ssg.author.getPostsPaginatedByAuthor.fetch({
    author: slug as string,
    page: page as number,
  });
  await ssg.author.getAuthorsBySlug.fetch({
    author: slug,
  });

  const totalPosts = authorPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / 9);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug: slug,
      page: page,
      totalPages,
    },
    revalidate: 1,
  };
};
