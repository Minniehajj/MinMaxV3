import Link from "next/link";
import { FC } from "react";
import { TaxonomyLinkProps } from "./types";

const TaxonomyLink: FC<TaxonomyLinkProps> = (props) => {
  return (
    <Link href={"/" + props.slug} passHref>
      <a {...props} href={"/" + props.slug}>
        {props.title}
      </a>
    </Link>
  );
};

export default TaxonomyLink;
