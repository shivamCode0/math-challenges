import "./scss/main.scss";
import "katex/dist/katex.min.css";
import { LoadingProvider } from "./contexts/LoadingContext";
import { PrintModeProvider } from "./contexts/PrintModeContext";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import Layout from "./Layout";

function App() {
  return (
    <>
      <LoadingProvider>
        <PrintModeProvider>
          <SearchQueryProvider>
            <Layout />
          </SearchQueryProvider>
        </PrintModeProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
