import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext, NextPage } from "next";
import { contentfulBlogPostRouter } from "server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React from "react";
import { Hero } from "components/atoms/Hero";
import Link from "next/link";
import { CardImage, CardImageProps } from "components/atoms/CardImage";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { UrlObject } from "url";
const Home = (props: { trpcState?: any; slug?: any; setBackgroundImage: (image: string) => void }) => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const posts = trpc.useQuery(["blogpost.getAllSlugs"]);
  const [data, setData] = React.useState(props.trpcState.json.queries[0].state.data);
  // console.log(data);
  return (
    <main className="container mx-auto flex h-screen w-full flex-col p-4">
      <Hero
        title={data[0].title}
        slug={data[0].slug}
        setBackgroundImage={props.setBackgroundImage}
        image={{
          ...data[0].heroImage,
        }}
        description={data[0].metaDescription}
        readTime={data[0].readTime}
        authors={data[0].authors}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map(
          (
            post: {
              slug: string;
              heroImage: JSX.IntrinsicAttributes & CardImageProps;
              title:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              readTime:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              authors: { items: any[] };
            },
            index: number
          ) => {
            if (index > 0) {
              return (
                <div key={index} className="relative mb-4">
                  <Link href={post.slug}>
                    <a href={post.slug} className="group">
                      <CardImage {...post.heroImage} setBackgroundImage={props.setBackgroundImage} />
                      <h2 className="mt-2 text-center text-2xl font-bold">{post.title}</h2>
                      {post.readTime && (
                        <p className="flex items-center justify-center gap-2 text-center">
                          <TimerIcon />
                          {post.readTime} minute read
                        </p>
                      )}

                      <div className="mt-4"></div>
                      {post.authors?.map((author: any, index: React.Key | null | undefined) => {
                        console.log(author);
                        return (
                          <p className="flex items-center justify-center gap-4 text-sm" key={index}>
                            <Avatar.Root>
                              <Avatar.Image
                                className="my-0 w-12 rounded-full"
                                src={author?.fields?.image?.fields?.file.url}
                              ></Avatar.Image>
                            </Avatar.Root>
                            {author.fields.title}
                          </p>
                        );
                      })}
                    </a>
                  </Link>
                </div>
              );
            }
          }
        )}
      </div>
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
  await ssg.fetchQuery("getAllPostsForHome");

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
}
export default Home;
