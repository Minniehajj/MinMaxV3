import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import React from "react";

const Page: NextPage = () => {
  return (
    <main>
      {/* {data?.pageBody && (
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
          {documentToReactComponents(data.pageBody.json, RichText(data.pageBody))}
        </div>
      )} */}
    </main>
  );
};

export default Page;
