import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext, NextPage } from "next";
import { contentfulBlogPostRouter } from "server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React, { Key } from "react";
import { Hero } from "components/atoms/Hero";
import Link from "next/link";
import { CardImage } from "components/atoms/CardImage";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
const Home = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const posts = trpc.useQuery(["blogpost.getAllSlugs"]);
  // const { data } = props.trpcState.json.queries[0].state;
  // const [data, setData] = React.useState(props.trpcState.json.queries[0].state.data);
  return (
    <main className="container mx-auto flex h-screen w-full flex-col p-4">
      {/* <Hero
        title={data[0].title}
        slug={data[0].slug}
        setBackgroundImage={props.setBackgroundImage}
        image={{
          ...data[0].heroImage,
        }}
        description={data[0].metaDescription}
        readTime={data[0].readTime}
        authors={data[0].authorsCollection.items}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post: any, index: number) => {
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
                    {post.authorsCollection.items?.map(
                      (
                        author: {
                          image: { url: string | undefined };
                          title: string;
                        },
                        index: Key
                      ) => {
                        return (
                          <p className="flex items-center justify-center gap-4 text-sm" key={index}>
                            <Avatar.Root>
                              <Avatar.Image className="my-0 w-12 rounded-full" src={author.image.url}></Avatar.Image>
                            </Avatar.Root>
                            {author.title}
                          </p>
                        );
                      }
                    )}
                  </a>
                </Link>
              </div>
            );
          }
        })}
      </div> */}
    </main>
  );
};