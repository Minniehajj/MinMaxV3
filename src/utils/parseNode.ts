/* eslint-disable @typescript-eslint/no-explicit-any */
import { MarkdownNode } from "@contentful/rich-text-from-markdown/dist/types/types";

const parseNode = (node: any) => {
  if (node.type === "image") {
    const newNode = {
      data: {
        target: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: node?.url || "",
            alt: node?.alt || "",
          },
        },
      },
      content: [],
      nodeType: "embedded-asset-block",
      type: "embedded-asset-block",
    };
    return newNode;
  }
  if (node.type === "linkReference") {
    const newNode = {
      type: "linkReference",
      nodeType: "linkReference",
      value: node.label,
      content: [],
    };
    return newNode;
  }
  return null;
};

export default parseNode;
