import DecklistFormatter from "components/molecules/DecklistFormatter/DecklistFormatter";
import { Decklist as DecklistParser } from "mtg-decklist-parser2";

const Decklist = ({ list, title }: { list: string; title: string }) => {
  const decklist = new DecklistParser(list);

  return (
    <div>
      <h3>
        {title}{" "}
        {decklist.companion && (
          <span className="text-gray-500"> {`- ${decklist.companion}`}</span>
        )}
      </h3>
      <div className="flex flex-col gap-4 md:flex-row md:gap-20">
        {DecklistFormatter({ list: decklist.deck, title: "Main Deck" })}
        {DecklistFormatter({ list: decklist.sideboard, title: "Sideboard" })}
      </div>
    </div>
  );
};

export default Decklist;
