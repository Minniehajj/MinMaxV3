/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import React, { Key } from "react";
import { MarkdownParserProps } from "./types";
import Image from "next/image";
import { CardToolTip } from "../CardToolTip";
import parseNode from "utils/parseNode";
import { Body, BodyProps } from "../Body";

// export declare type FallbackResolver = (mdNode: MarkdownNode) => Promise<Node | Node[] | null>;
// richTextFromMarkdown(md: string, fallback?: FallbackResolver): Promise<Document>;
const MarkdownParser = ({ children = "" }: MarkdownParserProps) => {
  const body = children.replace(/[\u2018\u2019]/g, "'");
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await richTextFromMarkdown(body, async (mdNode) => {
        return parseNode(mdNode) as any;
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
            src={"https:" + asset.data.target.sys.id}
            width={asset.width || 1920}
            height={asset.height || 1080}
            alt={asset.data.target.sys.alt || "Image"}
            quality={75}
          />
        );
      },
      ["linkReference"]: (node: any) => {
        return <CardToolTip name={node.value} />;
      },
      [BLOCKS.PARAGRAPH]: (node: any) => {
        const block = node.content.map(
          (
            child: JSX.IntrinsicAttributes & BodyProps,
            index: Key | null | undefined
          ) => {
            return <Body {...child} key={index} />;
          }
        );
        return <p>{block}</p>;
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
