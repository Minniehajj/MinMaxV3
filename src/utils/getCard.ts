import { Card, Cards } from "scryfall-api";

const getCard = async (name: string): Promise<Card | null | undefined> => {
  const card = Cards.byName(name, true)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  return card;
};

export default getCard;
