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
    src?: string;
    alt?: string;
  };
  publishDate: string;
  authors: {
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
  pageBody: {
    json: any;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          title: string;
          url: string;
          description: string;
          contentType: string;
          width: number;
          height: number;
        };
      };
    };
  };
  readTime: number;
};