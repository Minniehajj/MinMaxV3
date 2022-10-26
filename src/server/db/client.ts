/* eslint-disable no-var */
// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import { GraphQLClient } from "graphql-request";

declare global {
  var prisma: PrismaClient | undefined;
  var graph: GraphQLClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const graph =
  global.graph ||
  new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.graph = graph;
}

