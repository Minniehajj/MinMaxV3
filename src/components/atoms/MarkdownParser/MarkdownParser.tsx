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
          console.log("node", node);
          return {
            nodeType: "link",
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
        return null;
      });
      console.log(result);
      const options = {
        renderNode: {
          [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
          ["linkReference"]: (node: any, children: any) => <h1>{children}</h1>,
        },
      };
      setData(documentToReactComponents(result, options));
    };
    fetchData();
  }, [body]);
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      {data && data}
    </article>
  );
};

export default MarkdownParser;
