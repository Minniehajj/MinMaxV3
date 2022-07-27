import * as Switch from "@radix-ui/react-switch";
import { FC } from "react";
import { SwitchPrimitiveProps } from "./types";

const ToggleSwitch: FC<SwitchPrimitiveProps> = (props) => {
  return (
    <Switch.Root
      className="color:text-theme-white relative m-0 inline-flex h-5 w-12 justify-center rounded-full bg-theme-blue shadow-sm shadow-slate-800 rdx-state-checked:bg-theme-pink rdx-state-checked:text-theme-white dark:bg-theme-pink-dark dark:text-theme-white"
      {...props}
    >
      <Switch.Thumb
        className="absolute left-0 h-5 w-5 rounded bg-transparent transition rdx-state-checked:translate-x-7"
        asChild
      >
        {props.children}
      </Switch.Thumb>
    </Switch.Root>
  );
};
export default ToggleSwitch;
