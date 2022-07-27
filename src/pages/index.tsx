import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { contentfulBlogPostRouter } from "server/router/contentful-blog-post";
import { trpc } from "../utils/trpc";
import superjson from "superjson";
import { createContext } from "../server/router/context";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const posts = trpc.useQuery(["blogpost.getAllSlugs"]);
  return (
    <main className="container mx-auto flex h-screen flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        Create <span className="text-purple-300">T3</span> App
      </h1>
      <p className="text-2xl text-gray-700">This stack uses:</p>
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3"></div>
    </main>
  );
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
export default Home;
