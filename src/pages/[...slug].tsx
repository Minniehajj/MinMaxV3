import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import * as Avatar from "@radix-ui/react-avatar";

import { createSSGHelpers } from "@trpc/react/ssg";
import { contentfulBlogPostRouter } from "../server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React from "react";
import Image from "next/future/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "components/molecules/RichText";
import { TimerIcon } from "@radix-ui/react-icons";
import { GraphQLClient } from "graphql-request";
import { extractPostSlugs } from "utils/extract";

const Page: NextPage = (props: { trpcState?: any; slug?: any }) => {
  const [data, setData] = React.useState(props.trpcState.json.queries[0].state.data);

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
            {data.authorsCollection?.items?.map((author, index) => {
              return (
                <p className="flex items-center gap-4 text-sm" key={index}>
                  <Avatar.Root>
                    <Avatar.Image className="!my-0 w-12 rounded-full" src={author.image.url}></Avatar.Image>
                  </Avatar.Root>
                  {author.title}
                </p>
              );
            })}
          </div>
          <div className="mb-12" />
          {documentToReactComponents(data.pageBody.json, RichText(data.pageBody))}
        </div>
      )}
    </main>
  );
};

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const ssg = createSSGHelpers({
    router: contentfulBlogPostRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
  });
  // console.log(context);
  const slug = context?.params?.slug || [];
  // return {
  //   props: {},
  //   revalidate: 1,
  // };
  // prefetch `post.byId`
  await ssg.fetchQuery("getPost", {
    slug,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
}

export default Page;
