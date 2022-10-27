("use client");
import { trpc } from "utils/trpc";

const Home = () => {
  // const { data, refetch, isLoading } = trpc.card.getCard.useQuery({ card: name }, {
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
      </main>
    </div>
  );
};

export default Home;
