import Link from "next/link";
import { FC } from "react";
import { TaxonomyLinkProps } from "./types";

const TaxonomyLink: FC<TaxonomyLinkProps> = (props) => {
  return (
    <Link href={"/" + props.slug} {...props}>
      {props.title}
    </Link>
  );
};

export default TaxonomyLink;
