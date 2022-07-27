import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  // const posts = trpc.useQuery(["blogpost.getAllSlugs"]);
  return (
    <main className="container mx-auto flex h-screen flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        Create <span className="text-purple-300">T3</span> App
      </h1>
      <p className="text-2xl text-gray-700">This stack uses:</p>
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3"></div>
    </main>
  );
};

export default Home;
