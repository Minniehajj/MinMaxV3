import { createRouter } from "./context";
import { z } from "zod";
import getCard from "utils/getCard";

export const cardRouter = createRouter().query("getCard", {
  input: z.object({
    card: z.string(),
  }),
  async resolve({ input, ctx }) {
    return getCard(input.card);
  },
});
