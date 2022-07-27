import { CardToolTip } from "components/atoms/CardToolTip";
import { FC } from "react";
import { DecklistProps } from "./types";

const DecklistFormatter: FC<DecklistProps> = ({ list, title }) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-center text-2xl">{title}</h4>
      {list.map((card, index) => {
        return <CardToolTip key={index} amount={card.amount} name={card.name} className="border p-2 text-center" />;
      })}
    </div>
  );
};

export default DecklistFormatter;
