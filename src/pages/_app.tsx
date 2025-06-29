import "./../scss/main.scss";
import "katex/dist/katex.min.css";
import { LoadingProvider } from "./../contexts/LoadingContext";
import { PrintModeProvider } from "./../contexts/PrintModeContext";
import { SearchQueryProvider } from "./../contexts/SearchQueryContext";
import Layout from "./../components/Layout";

function App({ Component, pageProps }) {
  return (
    <>
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
