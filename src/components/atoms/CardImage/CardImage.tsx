import Image from "next/image";
import { FC, useState } from "react";
import { CardImageProps } from "./types";

const CardImage: FC<CardImageProps> = ({
  src,
  alt,
  setBackgroundImage,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={() => setBackgroundImage(src)}
      onMouseEnter={() => setBackgroundImage(src)}
      onFocus={() => setBackgroundImage(src)}
      className="shadow-theme-dark bg-theme-black shadow-none transition duration-200 ease-in-out hover:ease-in group-hover:shadow-sm dark:group-hover:shadow-theme-blue"
    >
      <Image
        src={src}
        alt={alt}
        priority
        {...props}
        className={`${
          loaded ? "blur-none" : "blur-lg"
        } aspect-video h-full w-full object-cover`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
};

export default CardImage;
