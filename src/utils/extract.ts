import { PostProps } from "types";
import getReadTime from "./getReadTime";

export function extractPost(fetchResponse: {
  postCollection: { items: PostProps[] };
}) {
  const post = fetchResponse.postCollection.items[0];
  if (post)
    post.heroImage = {
      ...post.heroImage,
      alt: post.heroImage.title,
      src: post.heroImage.url,
    };

  if (post?.pageBody?.json) {
    post.readTime = getReadTime(JSON.stringify(post?.pageBody?.json));
  }
  if (post?.body) {
    post.readTime = getReadTime(JSON.stringify(post?.body));
  }
  return post ?? null;
}

export function extractAuthors(fetchResponse: {
  authorCollection: {
    items: {
      image: { width: string; height: string; url: string };
      title: string;
    }[];
  };
}) {
  const post = fetchResponse.authorCollection.items;
  return post;
}

export function extractPostEntries(fetchResponse: {
  postCollection: { items: PostProps[] };
}) {
  const posts = fetchResponse.postCollection.items;
  return posts.map((post) => {
    post.heroImage = {
      ...post.heroImage,
      alt: post.heroImage.title,
      src: post.heroImage.url,
    };
    if (post?.pageBody?.json) {
      post.readTime = getReadTime(JSON.stringify(post?.pageBody?.json));
    }
    if (post?.body) {
      post.readTime = getReadTime(JSON.stringify(post?.body));
    }

    return post;
  });
}

export function extractPostEntriesFromAuthors(fetchResponse: {
  authorCollection: {
    items: { linkedFrom: { postCollection: { items: PostProps[] } } }[];
  };
}) {
  const posts =
    fetchResponse?.authorCollection?.items[0]?.linkedFrom.postCollection.items;
  return posts?.map((post) => {
    post.heroImage = {
      ...post.heroImage,
      alt: post.heroImage.title,
      src: post.heroImage.url,
    };
    if (post?.pageBody?.json) {
      post.readTime = getReadTime(JSON.stringify(post?.pageBody?.json));
    }
    if (post?.body) {
      post.readTime = getReadTime(JSON.stringify(post?.body));
    }

    return post;
  });
}
export function extractPostSlugs(fetchResponse: {
  postCollection: { items: PostProps[] };
}) {
  const posts = fetchResponse.postCollection.items;
  return posts.map((post) => {
    return {
      params: { slug: [post.slug] },
    };
  });
}
export function extractAuthorSlugs(fetchResponse: {
  authorCollection: { items: PostProps[] };
}) {
  const posts = fetchResponse.authorCollection.items;
  return posts.map((post) => {
    return {
      params: { slug: [post.slug] },
    };
  });
}

export function extractTagEntries(fetchResponse: {
  data: { tagCollection: { items: { title: string; slug: string }[] } };
}) {
  return fetchResponse?.data?.tagCollection?.items;
}

export function extractImage(fetchResponse: {
  data: { assetCollection: { items: { width: number; height: number }[] } };
}) {
  return fetchResponse?.data;
}
