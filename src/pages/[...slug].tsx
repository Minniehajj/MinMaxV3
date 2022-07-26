import type { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import { ContentfulClient } from "../server/db/client";
import { trpc } from "../utils/trpc";
import { createSSGHelpers } from "@trpc/react/ssg";
import { contentfulBlogPostRouter } from "../server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React from "react";

const Page = (props: { trpcState?: any; slug?: any }) => {
  const { slug } = props;
  const postQuery = trpc.useQuery(["blogpost.getPost", { slug }]);
  const [data, setData] = React.useState(
    props.trpcState.json.queries[0].state.data
  );
  React.useEffect(() => {
    if (postQuery.status === "success") {
      setData(postQuery.data);
    }
  }, [postQuery.data, postQuery.status]);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          {data?.items[0]?.fields?.title}
        </h1>
      </main>
    </>
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
