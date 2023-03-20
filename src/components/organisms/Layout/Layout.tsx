import { Nav } from "components/molecules/Nav";
import Head from "next/head";
import { FC } from "react";
import { LayoutProps } from "./types";
import { AnimatePresence, motion } from "framer-motion";

const Layout: FC<LayoutProps> = ({ children, backgroundImage }) => {
  return (
    <>
      <Head>
        <title>MinMax</title>
        <meta name="description" content="MinMaxBlog.com" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AnimatePresence>
        <motion.div
          key={backgroundImage + "-background"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="fixed top-0 left-0 -z-10 h-full min-h-[1080px] w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply"
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})` }
              : {}
          }
        ></motion.div>
        <div className="z-10 m-auto max-w-screen-2xl px-4">
          <Nav />
          {children}
        </div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
