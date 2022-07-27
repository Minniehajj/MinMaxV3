import DecklistFormatter from "components/molecules/DecklistFormatter/DecklistFormatter";
import { CardModel, Decklist as DecklistParser } from "mtg-decklist-parser2";
import { Key, useEffect, useState } from "react";
import { SampleHand } from "components/molecules/SampleHand";

const Decklist = ({ list, title }: { list: string; title: string }) => {
  const decklist = new DecklistParser(list);
  const [hand, newHand] = useState(false);

  return (
    <div>
      <h3>
        {title} {decklist.companion && <span className="text-gray-500"> {`- ${decklist.companion}`}</span>}
      </h3>
      <div className="flex flex-col gap-4 md:flex-row md:gap-20">
        {DecklistFormatter({ list: decklist.deck, title: "Main Deck" })}
        {DecklistFormatter({ list: decklist.sideboard, title: "Sideboard" })}
      </div>
      <button
        onClick={() => {
          newHand(!hand);
        }}
      >
        Draw a new hand
      </button>
      <div>
        <div className="flex flex-wrap gap-4">{SampleHand(decklist, hand)}</div>
      </div>
    </div>
  );
};

export default Decklist;
