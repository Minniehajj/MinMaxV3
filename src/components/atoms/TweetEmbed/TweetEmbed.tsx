import { useTheme } from "next-themes";

import { Tweet } from "react-twitter-widgets";
import { useMediaQuery } from "usehooks-ts";

const TweetEmbed = ({ tweetId }: { tweetId: string }) => {
  const { resolvedTheme } = useTheme();
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <Tweet
      options={{
        align: "center",
        theme: resolvedTheme,
        dnt: true,
        width: !matches && "100%",
      }}
      tweetId={tweetId}
    />
  );
};

export default TweetEmbed;
