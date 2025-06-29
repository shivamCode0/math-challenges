import "preact/devtools";
import React from "react";
import "./../scss/main.scss";
import { LoadingProvider } from "./../contexts/LoadingContext";
import { PrintModeProvider } from "./../contexts/PrintModeContext";
import { SearchQueryProvider } from "./../contexts/SearchQueryContext";
import Layout from "./../components/Layout";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "./../scss/nprogress.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Undefined Title | Math Challenges</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
      </Head>
      <LoadingProvider>
        <PrintModeProvider>
          <SearchQueryProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SearchQueryProvider>
        </PrintModeProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
