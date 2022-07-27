import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { LinkProps } from "types/LinkProps";

export type NavIconProps = {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  link: LinkProps;
};
