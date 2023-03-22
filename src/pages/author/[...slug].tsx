import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React, { useEffect } from "react";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import { extractAuthorSlugs, extractPostSlugs } from "utils/extract";
import superjson from "superjson";
import { trpc } from "utils/trpc";
import Image from "next/image";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "components/molecules/RichText";
import { graph } from "server/db/client";
import { MarkdownParser } from "components/atoms/MarkdownParser";

interface PageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  setBackgroundImage: (image: string) => void;
}
const Page = (props: PageProps) => {
  const { slug } = props;

  const postsQuery = trpc.author.getPostsPaginatedByAuthor.useQuery({
    page: 1,
    author: slug as string,
  });
  console.log(postsQuery);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      Hello World
    </div>
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

  const totalPosts = authorPosts.items?.length;
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
