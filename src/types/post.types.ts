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
    content: {
      nodeType: string;
      data: {};
      content: {
        content: {
          nodeType: string;
          value: string;
        }[];
        data: {
          target: {
            fields: {
              title: string;
              file: {
                url: string;
                fileName: string;
                contentType: string;
                details: {
                  image: {
                    width: number;
                    height: number;
                  };
                };
              };
            };
          };
        };
      }[];
    }[];
  };
  readTime: number;
};
