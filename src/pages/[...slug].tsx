import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React from "react";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import { extractPostSlugs } from "utils/extract";
import superjson from "superjson";
import { trpc } from "utils/trpc";
import Image from "next/image";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "components/molecules/RichText";

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { slug } = props;
  const postQuery = trpc.blogPost.getPost.useQuery({ slug });
  const { data, isLoading, error } = postQuery;
  if (!data || isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <main>
      {data?.pageBody && (
        <div className="prose m-auto dark:prose-invert lg:prose-xl">
          <h1>{data.title}</h1>
          <Image
            {...data.heroImage}
            priority
            alt={data.heroImage.alt}
            className="shadow-theme-dark -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm dark:shadow-theme-blue"
          />
          <p className="flex items-center gap-2 text-sm">
            <TimerIcon />
            {data.readTime} minute read
          </p>
          <div className="flex gap-8">
            {data.authorsCollection?.items?.map(
              (
                author: {
                  image: { url: string };
                  title: string;
                },
                index: React.Key
              ) => {
                return (
                  <p className="flex items-center gap-4 text-sm" key={index}>
                    <Avatar.Root>
                      <Avatar.Image
                        className="!my-0 w-12 rounded-full"
                        alt={author.title}
                        src={author.image.url}
                      ></Avatar.Image>
                    </Avatar.Root>
                    {author.title}
                  </p>
                );
              }
            )}
          </div>
          <div className="mb-12" />
          {documentToReactComponents(
            data.pageBody.json,
            RichText(data.pageBody)
          )}
        </div>
      )}
    </main>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  let slugs: { params: { slug: string[] } }[] = [];
  if (graph) {
    const entry = await graph.request(
      `query{
          postCollection(where: { slug_exists: true }) {
              items {
                slug
              }
            }
          }`
    );
    slugs = extractPostSlugs(entry);
  }

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
  await ssg.blogPost.getPost.fetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
};
