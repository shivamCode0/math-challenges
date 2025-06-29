import "preact/devtools";
import React from "react";
import "./../scss/main.scss";
import { LoadingProvider } from "./../contexts/LoadingContext";
import { PrintModeProvider } from "./../contexts/PrintModeContext";
import { SearchQueryProvider } from "./../contexts/SearchQueryContext";
import Layout from "./../components/Layout";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Undefined Title | Math Challenges</title>
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
