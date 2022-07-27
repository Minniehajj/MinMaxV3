import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import * as Avatar from "@radix-ui/react-avatar";
import { ContentfulClient } from "../server/db/client";

import { createSSGHelpers } from "@trpc/react/ssg";
import { contentfulBlogPostRouter } from "../server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React from "react";
import Image from "next/future/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "components/molecules/RichText";
import { TimerIcon } from "@radix-ui/react-icons";

const Page: NextPage = (props: { trpcState?: any; slug?: any }) => {
  const [data, setData] = React.useState(props.trpcState.json.queries[0].state.data[0]);
  console.log(data);
  return (
    <main className="">
      {data?.pageBody && (
        <div className="prose m-auto dark:prose-invert lg:prose-xl">
          <h1>{data.title}</h1>
          <Image
            {...data.heroImage}
            alt={data.heroImage.alt}
            priority
            className="shadow-theme-dark -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm dark:shadow-theme-blue"
          />
          <p className="flex items-center gap-2 text-sm">
            <TimerIcon />
            {data.readTime} minute read
          </p>
          <div className="flex gap-8">
            {data.authors?.items?.map((author, index) => {
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
          {/* {documentToReactComponents(data.pageBody, RichText(data.pageBody))} */}
        </div>
      )}
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await ContentfulClient.getEntries({
    content_type: "post",
  });
  return {
    paths: posts.items.map(
      (post: {
        fields: {
          slug: string;
        };
      }) => ({
        params: {
          slug: [post.fields.slug],
        },
      })
    ),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
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
