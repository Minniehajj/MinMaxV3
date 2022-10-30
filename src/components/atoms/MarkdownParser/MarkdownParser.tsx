import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { RichText } from "components/molecules/RichText";
import React from "react";
import { MarkdownParserProps } from "./types";

const MarkdownParser = ({ children = "" }: MarkdownParserProps) => {
  let parsedBody;
  const p = /\[([\s\w\d-+_/,'’&]*)\]/g;
  const body = children.replace(/[\u2018\u2019]/g, "'");

  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await richTextFromMarkdown(body, async (node) => {
        if (node.type === "linkReference") {
          return {
            nodeType: "paragraph",
            data: {},
            content: [
              {
                nodeType: "text",
                value: node.identifier,
                marks: [],
                data: {},
              },
            ],
          };
        }
        return node;
      });

      setData(result);
    };
    fetchData();
  }, [body]);
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      {data && documentToReactComponents(data, data.options)}
    </article>
  );
};

export default MarkdownParser;
