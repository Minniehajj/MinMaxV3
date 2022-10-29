import Markdown from "markdown-to-jsx";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import React from "react";
import reactStringReplace from "react-string-replace";
import { Body } from "../Body";
import { CardToolTip } from "../CardToolTip";
import { MarkdownParserProps } from "./types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "components/molecules/RichText";

const MarkdownParser = ({ children = "" }: MarkdownParserProps) => {
  let parsedBody;
  const p = /\[([\s\w\d-+_/,'’&]*)\]/g;
  const body = children.replace(/[\u2018\u2019]/g, "'");

  const [data, setData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await richTextFromMarkdown(body);
      setData(result);
    };
    fetchData();
  }, [body]);
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      Hello World
    </article>
  );
};

export default MarkdownParser;
