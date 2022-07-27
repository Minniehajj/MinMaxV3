import { IconProps } from "@radix-ui/react-icons/dist/types";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { LinkProps } from "types";

export type NavIconProps = {
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  link: LinkProps;
};
