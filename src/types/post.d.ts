import { NodeData } from "components/molecules/RichText/types";

export type PostProps = {
  slug: string;
  title: string;
  heroImage: {
    title: string;
    description: string;
    contentType: string;
    fileName: string;
    url: string;
    width: number;
    height: number;
    src: string;
    alt: string;
  };
  publishDate: string;
  authorsCollection: {
    items: {
      title: string;
      twitter: string;
      slug: string;
      image: {
        url: string;
      };
    }[];
  };
  metaDescription: string;
  tags: {
    items: {
      title: string;
      slug: string;
    }[];
  };
  body?: string;
  pageBody:NodeData;
  readTime: number;
};
