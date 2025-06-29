import "preact/devtools";
import "util/error";
import React from "react";
import "scss/main.scss";
import "scss/nprogress.scss";
import { LoadingProvider } from "contexts/LoadingContext";
import { PrintModeProvider } from "contexts/PrintModeContext";
import { SearchQueryProvider } from "contexts/SearchQueryContext";
import { ProvideDarkMode } from "contexts/useDarkMode";
import Layout from "components/Layout";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Undefined Title | Math Challenges</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>

        <meta name="theme-color" content="#249e47" />
        <meta name="description" content="Math Challenges allows you to test yourself or anyone with fun and educational math questions!" key="desc" />
      </Head>
      <ProvideDarkMode>
        <LoadingProvider>
          <PrintModeProvider>
            <SearchQueryProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SearchQueryProvider>
          </PrintModeProvider>
        </LoadingProvider>
      </ProvideDarkMode>
    </>
  );
}

export default App;
