/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import React from "react";
import { MarkdownParserProps } from "./types";
import Image from "next/image";
import { MarkdownNode } from "@contentful/rich-text-from-markdown/dist/types/types";
import { CardToolTip } from "../CardToolTip";
const MarkdownParser = ({ children = "" }: MarkdownParserProps) => {
  const body = children.replace(/[\u2018\u2019]/g, "'");
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await richTextFromMarkdown(body, (node: MarkdownNode) => {
        if (node.type === "image") {
          const newNode = {};
          newNode.type = "embedded-asset-block";
          newNode.nodeType = "embedded-asset-block";
          newNode.data = {
            target: {
              sys: {
                type: "Link",
                linkType: "Asset",
                id: node.url,
                alt: node.alt,
              },
            },
          };
          newNode.content = [];
          return newNode;
        }
        if (node.type === "linkReference") {
          const newNode = {};
          newNode.type = "linkReference";
          newNode.nodeType = "linkReference";
          newNode.value = node.label;
          newNode.content = [];
          return newNode;
        }

        return null;
      });
      setData(result);
    };
    fetchData();
  }, [body]);
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (asset: any) => {
        return (
          <Image
            src={"https://" + asset.data.target.sys.id}
            width={asset.width || 1920}
            height={asset.height || 1080}
            alt={asset.data.target.sys.alt || "Image"}
            quality={75}
          />
        );
      },
      ["linkReference"]: (node: any) => {
        return <CardToolTip name={node.value} />;
        return <div>Hello</div>;
      },
    },
  };
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      {data && documentToReactComponents(data, options)}
    </article>
  );
};

export default MarkdownParser;
