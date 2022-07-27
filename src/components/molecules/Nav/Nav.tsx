import NavSVG from "@/public/minmax_rgb.svg";
import Link from "next/link";
import { HomeIcon, PersonIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ThemeToggleButton from "../ThemeSwitcher/ThemeSwitcher";
import { NavIcon } from "components/atoms/NavIcon";

const Nav = () => {
  return (
    <header className="">
      <nav className="flex items-center justify-between">
        <div className="">
          <Link href="/">
            <a
              className="flex text-theme-black transition-colors hover:text-gray-300 dark:text-theme-white"
              title="Home"
            >
              <NavSVG className="h-20 w-20 fill-current sm:h-40 sm:w-40" />
            </a>
          </Link>
        </div>
        <div>
          <ul className="flex flex-grow gap-2 sm:gap-12">
            <li>
              <NavIcon Icon={HomeIcon} link={{ href: "/", title: "Home" }} />
            </li>
            <li>
              <NavIcon Icon={PersonIcon} link={{ href: "/authors", title: "Authors" }} />
            </li>
            <li>
              <NavIcon Icon={MagnifyingGlassIcon} link={{ href: "/search", title: "Search" }} />
            </li>
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
