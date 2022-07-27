import { CardModel } from "mtg-decklist-parser2";

export type DecklistProps = {
  list: CardModel[];
  title?: string;
};
