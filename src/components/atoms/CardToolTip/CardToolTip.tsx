import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/future/image";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { CardToolTipProps } from "./types";
import getCard from "utils/getCard";
import { Card } from "scryfall-api";
import { trpc } from "utils/trpc";

let CardToolTip: FC<CardToolTipProps> = ({ amount, name, ...props }) => {
  const [image, setImage] = useState<any>("");
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const { data, refetch, isLoading } = trpc.useQuery([
    "card.getCard",
    {
      card: name,
    },
  ]);
  // if (tooltipOpen && !isLoading) {
  //   if (data?.image_uris?.png) {
  //     console.log(data.image_uris.png);
  //     // setImage(data?.image_uris?.png);
  //   } else if (data?.card_faces) {
  //     // setImage(data?.card_faces[0]?.image_uris?.png);
  //   } else {
  //     // setImage("");
  //   }
  // }

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
          {data?.image_uris && <Image src={data.image_uris.png} alt={data.name} width={248} height={346} />}
          {/* <div>{image && <Image src={image} width={248} height={346} alt="test" />}</div> */}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

CardToolTip = memo(CardToolTip);
export default CardToolTip;
