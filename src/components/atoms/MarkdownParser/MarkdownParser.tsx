import Markdown from "markdown-to-jsx";
import { MarkdownParserProps } from "./types";

const MarkdownParser = ({ children = "" }: MarkdownParserProps) => {
  
  return (
    <article className="prose m-auto dark:prose-invert lg:prose-xl">
      <Markdown>{children}</Markdown>
    </article>
  );
};

export default MarkdownParser;
