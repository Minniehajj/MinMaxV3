import { PostProps } from "types";
import getReadTime from "./getReadTime";

export function extractPost(fetchResponse: { postCollection: { items: PostProps[] } }) {
  const post = fetchResponse.postCollection.items[0];
  if (post)
    post.heroImage = {
      alt: post.heroImage.title,
      src: post.heroImage.url,
      ...post.heroImage,
    };
  if (post?.pageBody?.json) {
    post.readTime = getReadTime(JSON.stringify(post?.pageBody?.json));
  }
  return post;
}

export function extractPostEntries(fetchResponse: { postCollection: { items: PostProps[] } }) {
  const posts = fetchResponse.postCollection.items;
  return posts.map((post) => {
    post.heroImage = {
      alt: post.heroImage.title,
      src: post.heroImage.url,
      ...post.heroImage,
    };
    if (post?.pageBody?.json) {
      post.readTime = getReadTime(JSON.stringify(post?.pageBody?.json));
      return post;
    } else {
      return post;
    }
  });
}
export function extractPostSlugs(fetchResponse: { postCollection: { items: PostProps[] } }) {
  const posts = fetchResponse.postCollection.items;
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