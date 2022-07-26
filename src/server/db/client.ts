import { env } from "../../env/server.mjs";
import { PrismaClient } from "@prisma/client";

export const ContentfulClient = require("contentful").createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

declare global {
  var contentful: typeof ContentfulClient | undefined;
  var prisma: PrismaClient | undefined;
}

export const contentful =
  global.contentful ||
  require("contentful").createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

if (env.NODE_ENV !== "production") {
  global.contentful = contentful;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
