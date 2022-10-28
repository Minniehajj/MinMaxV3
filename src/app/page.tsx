import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createContextInner } from "server/trpc/context";
import { appRouter } from "server/trpc/router/_app";
import superjson from "superjson";

const Home = async () => {
  
  // const { data, refetch, isLoading } = trpc.card.getCard.useQuery({ card: name   , {
  //   enabled: !!tooltipOpen,
  //   trpc:{}
  // });
  // const { data, refetch, isLoading } = trpc.blogPost.getPostsPaginated.useQuery(
  //   { page: "1" },
  //   {}
  // );
  // console.log(data);
  return (
    <div>
      <main>
        <div>Hello World</div>
        {/* {posts.queries.length} */}
      </main>
    </div>
  );
};

export default Home;
