import { CardImage } from "components/atoms/CardImage";
import { Hero } from "components/atoms/Hero";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { TimerIcon } from "@radix-ui/react-icons";
import { graph } from "server/db/client";
import { createSSGHelpers } from "@trpc/react/ssg";
import { contentfulBlogPostRouter } from "server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "server/router/context";
import { UrlObject } from "url";
import { Key } from "react";
const PaginatedBlogPage = (props: { trpcState?: any; slug?: any; setBackgroundImage: (image: string) => void }) => {
  const { data } = props.trpcState.json.queries[0].state;
  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map(
          (
            post: {
              slug: string;
              heroImage: string;
              title: string;
              readTime: number;
              authorsCollection: { items: any[] };
            },
            index: Key
          ) => {
            return (
              <div key={index} className="relative mb-4">
                <Link href={post.slug}>
                  <a href={post.slug} className="group">
                    <CardImage src={post.heroImage} alt={post.title} setBackgroundImage={props.setBackgroundImage} />
                    <h2 className="mt-2 text-center text-2xl font-bold">{post.title}</h2>
                    <div className="mt-2"></div>
                    <p className="flex items-center justify-center gap-2 text-sm">
                      <TimerIcon />
                      {post.readTime} minute read
                    </p>
                    <div className="mt-2" />
                    <div className="flex items-center justify-center gap-4">
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
                    </div>
                  </a>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
};

export default PaginatedBlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await graph.request(
    `query{
          postCollection(where: { slug_exists: true }) {
              items {
                slug
              }
            }
          }`
  );
  const totalPosts = entries?.postCollection?.items?.length;
  const totalPages = Math.ceil(totalPosts / 9);
  const paths = [];
  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  //   const allTags = (await getAllTags(preview)) ?? []
  const ssg = createSSGHelpers({
    router: contentfulBlogPostRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
  });
  const slug = params?.slug || [];
  await ssg.fetchQuery("getAllPostsForHome", { page: params?.page as string });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
};
