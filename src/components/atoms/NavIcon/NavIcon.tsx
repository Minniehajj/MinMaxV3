import Link from "next/link";
import { FC } from "react";
import { NavIconProps } from "./types";
import * as Tooltip from "@radix-ui/react-tooltip";

const NavIcon: FC<NavIconProps> = ({ Icon, link }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <Link href={link.href} passHref>
              <a {...link} className="group relative flex w-12 flex-col items-center justify-center sm:w-20">
                <Icon className="mb-1 h-5 w-5 group-hover:animate-bounce group-hover:text-theme-pink-dark dark:group-hover:text-theme-pink" />
              </a>
            </Link>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Content className="rdx-state-delated-open:transition-all opacity-0 transition-all rdx-state-delayed-open:opacity-100">
          <p className="tracking-widest">{link.title}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default NavIcon;
