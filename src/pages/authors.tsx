import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext, NextPage } from "next";
import { contentfulBlogPostRouter } from "server/router/contentful-blog-post";
import superjson from "superjson";
import { createContext } from "../server/router/context";
import React, { Key } from "react";
import { Hero } from "components/atoms/Hero";
import Link from "next/link";
import { CardImage, CardImageProps } from "components/atoms/CardImage";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { UrlObject } from "url";
import { authorRouter } from "server/router/author";
const AuthorsPage = (props: { trpcState?: any; slug?: any; setBackgroundImage: (image: string) => void }) => {
  const { data } = props.trpcState.json.queries[0].state;
  console.log(data);
  return <main className="container mx-auto flex h-screen w-full flex-col p-4">Hello World</main>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const ssg = createSSGHelpers({
    router: authorRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
  });
  const slug = context?.params?.slug || [];
  await ssg.fetchQuery("getAuthors");

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
}
export default AuthorsPage;
