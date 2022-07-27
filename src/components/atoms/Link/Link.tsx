import { FC } from "react";

const Link: FC<{
  href: string;
  children: any;
}> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-block">
      {children}
    </a>
  );
};

export default Link;
