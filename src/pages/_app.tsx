// src/pages/_app.tsx
import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";

import { ThemeProvider } from "next-themes";
import { Layout } from "components/organisms/Layout";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [backgroundImage, setBackgroundImage] = React.useState("");
  return (
    // <SessionProvider session={session}>
    <ThemeProvider attribute="class">
      <Layout {...pageProps} backgroundImage={backgroundImage}>
        <Component {...pageProps} setBackgroundImage={setBackgroundImage} />
      </Layout>
    </ThemeProvider>
    // </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
