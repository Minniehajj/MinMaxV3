import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import getCard from "../../../utils/getCard";

export const cardRouter = router({
    getCard: publicProcedure
        .input(z.object({ card: z.string() }))
        .query(({ input }) => {
            return getCard(input.card)
        }),
});
