import getCard from "lib/getCard";
import parseList from "lib/parseList";
import { Decklist, CardModel } from "mtg-decklist-parser2";
import Image from "next/future/image";
import { Key, useEffect, useState } from "react";

const SampleHand = (decklist: Decklist<CardModel>, hand: unknown) => {
  const [currentHand, setCurrentHand] = useState<string[]>([]);
  const parsedList = parseList(decklist);
  const maxHandSize = 7;

  const [cardImages, setCardImages] = useState<any>([]);
  const drawHand = () => {
    const handArray: string[] = [];
    for (let i = 0; i < maxHandSize; i++) {
      let cardname = parsedList.splice(Math.floor(Math.random() * parsedList.length), 1)[0];
      handArray.push(cardname);
    }
    setCurrentHand(handArray);
    return currentHand.map((cardname) => {
      getCard(cardname).then((card) => {
        if (card?.image_uris?.png) {
          return setCardImages((prev: any) => [...prev, card?.image_uris?.png]);
        } else if (card?.card_faces) {
          const face = card?.card_faces[0] || {};
          return setCardImages((prev: any) => [...prev, face.image_uris?.png]);
        }
      });
    });
  };
  useEffect(() => {
    setCardImages([]);
    drawHand();
  }, [hand]);
  return (
    <>
      {cardImages.length > 0 &&
        cardImages.map((image: string, key: Key | null | undefined) => {
          return <Image key={key} src={image} width={150} className="!my-0" />;
        })}
    </>
  );
};

export default SampleHand;
