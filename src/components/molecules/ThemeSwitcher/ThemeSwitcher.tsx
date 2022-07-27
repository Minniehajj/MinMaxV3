import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import BlackManaSymbol from "@/public/black_mana_symbol.svg";
import WhiteManaSymbol from "@/public/white_mana_symbol.svg";
import { ToggleSwitch } from "components/atoms/ToggleSwitch";

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(targetTheme);
  };
  return (
    <ToggleSwitch onClick={toggleTheme}>
      {resolvedTheme === "light" ? (
        <span>
          <WhiteManaSymbol />
          <span className="sr-only">Light theme</span>
        </span>
      ) : (
        <span>
          <BlackManaSymbol />
          <span className="sr-only">Dark theme</span>
        </span>
      )}
    </ToggleSwitch>
  );
};

export default ThemeToggleButton;
