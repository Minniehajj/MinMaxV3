import { CardImage } from "components/atoms/CardImage";
import { Hero } from "components/atoms/Hero";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React, { Key } from "react";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import superjson from "superjson";

import * as Avatar from "@radix-ui/react-avatar";
import { TimerIcon } from "@radix-ui/react-icons";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

import { PostProps } from "types";
import { trpc } from "utils/trpc";

interface PageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  setBackgroundImage: (image: string) => void;
}

const Home = (props: PageProps) => {
  const postsQuery = trpc.blogPost.getPostsPaginated.useQuery();
  const { data, isLoading, error } = postsQuery;
  if (!data || isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <main className="container mx-auto flex h-screen w-full flex-col p-4">
      {data.length > 0 && data[0] && (
        <>
          <Hero
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
            {data.map((post: PostProps, index: number) => {
              if (index > 0) {
                return (
                  <div key={index} className="relative mb-4">
                    <Link href={post.slug} className="group">
                      <CardImage
                        {...post.heroImage}
                        setBackgroundImage={props.setBackgroundImage}
                      />
                      <h2 className="mt-2 text-center text-2xl font-bold">
                        {post.title}
                      </h2>
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
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default Home;

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  await ssg.blogPost.getPostsPaginated.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
