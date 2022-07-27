import { CardModel, Decklist as DecklistParser } from "mtg-decklist-parser2";
const parseList = (decklist: DecklistParser<CardModel>) => {
  const deckArray: string[] = [];
  decklist.deck.map((card: CardModel) => {
    for (let i = 0; i < card.amount; i++) {
      deckArray.push(card.name);
    }
  });
  return deckArray;
};

export default parseList;
