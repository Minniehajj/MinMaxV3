import Markdown from "markdown-to-jsx";
import { MarkdownParserProps } from "./types";

const Body = ({ children = "" }: MarkdownParserProps) => {
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      <Markdown>{children}</Markdown>
    </article>
  );
};

export default Body;
