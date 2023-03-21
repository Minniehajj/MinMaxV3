import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { HeroProps } from "./types";
import { TimerIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";

const Hero: FC<HeroProps> = ({
  title,
  slug,
  image,
  description,
  setBackgroundImage,
  readTime,
  authors,
}) => {
  return (
    <Link
      href={slug}
      className="relative block w-full lg:mb-12 lg:-mt-8"
      onClick={() => {
        if (setBackgroundImage) {
          setBackgroundImage(image.src);
        }
      }}
      onMouseEnter={() => {
        if (setBackgroundImage) {
          setBackgroundImage(image.src);
        }
      }}
    >
      <Image
        {...image}
        alt={image.alt}
        priority
        className="shadow-theme-dark -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm transition duration-100 ease-in-out hover:shadow-lg hover:ease-in dark:shadow-theme-blue"
      />
      <div className="prose top-1/2 right-20 mt-8 -translate-y-7 rounded border bg-opacity-80 p-2 dark:prose-invert lg:absolute lg:mt-0 lg:bg-theme-white lg:p-8 lg:dark:bg-theme-black">
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="flex items-center gap-2 text-sm">
          <TimerIcon />
          {readTime} minute read
        </p>
        <div className="flex gap-8">
          {authors?.map((author, index) => {
            return (
              <p className="flex items-center gap-4 text-sm" key={index}>
                <Avatar.Root>
                  <Avatar.Image
                    className="my-0 aspect-square w-12 rounded-full"
                    src={author?.image?.url}
                  ></Avatar.Image>
                </Avatar.Root>
                {author.title}
              </p>
            );
          })}
        </div>
      </div>
      <div className="mb-12" />
    </Link>
  );
};
export default Hero;
