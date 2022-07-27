import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/future/image";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { CardToolTipProps } from "./types";
import getCard from "utils/getCard";
import { Card } from "scryfall-api";

let CardToolTip: FC<CardToolTipProps> = ({ amount, name, ...props }) => {
  const [image, setImage] = useState<any>("");
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  useEffect(() => {
    if (tooltipOpen) {
      getCard(name).then((card) => {
        if (card?.image_uris?.png) {
          return setImage(card?.image_uris?.png);
        } else if (card?.card_faces) {
          return setImage(card?.card_faces[0]?.image_uris?.png);
        }
      });
    }
    return () => {
      setImage("");
    };
  }, [tooltipOpen, name]);
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={tooltipOpen} onOpenChange={(open) => setTooltipOpen(open)}>
        <Tooltip.Trigger asChild>
          <button
            className={`${props.className} text-theme-blue-dark dark:text-theme-blue`}
            onClick={() => setTooltipOpen(!tooltipOpen)}
          >
            {amount && <span>{amount} </span>}
            <span>{name}</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className="rounded-sm">
          <div>{image && <Image src={image} width={248} height={346} alt="test" />}</div>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

CardToolTip = memo(CardToolTip);
export default CardToolTip;
