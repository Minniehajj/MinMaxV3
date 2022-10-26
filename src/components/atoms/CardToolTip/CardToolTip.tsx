import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import { FC, memo, useState } from "react";
import { CardToolTipProps } from "./types";
import getCard from "utils/getCard";
import { Card } from "scryfall-api";
import { trpc } from "utils/trpc";

let CardToolTip: FC<CardToolTipProps> = ({ amount, name, ...props }) => {  
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { data, refetch, isLoading } = trpc.card.getCard.useQuery({ card: name }, {
    enabled: !!tooltipOpen,
    trpc:{}
  });
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={tooltipOpen} onOpenChange={(open) => setTooltipOpen(open)}>
        <Tooltip.Trigger asChild>
          <button
            className={`${props.className} text-theme-blue-dark dark:text-theme-blue ${
              isLoading ? "hover:cursor-wait" : "hover:cursor-auto"
            }`}
            onClick={() => {
              refetch();
              setTooltipOpen(!tooltipOpen);
            }}
          >
            {amount && <span>{amount} </span>}
            <span>{name}</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className="rounded-sm">
          {data?.image_uris && <Image src={data.image_uris.png} alt={data.name} width={248} height={346} />}
          {data?.card_faces && (
            <Image src={data.card_faces[0]?.image_uris?.png || ""} alt={data.name} width={248} height={346} />
          )}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

CardToolTip = memo(CardToolTip);
export default CardToolTip;
