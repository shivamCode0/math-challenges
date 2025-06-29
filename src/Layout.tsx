import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Play from "./components/Play";
import Category from "./components/Category";
import Search from "./components/Search";
import { useLoading } from "./contexts/LoadingContext";
import { usePrintMode } from "./contexts/PrintModeContext";
import { useSearchQuery } from "./contexts/SearchQueryContext";

function Layout() {
  const { isLoading, setLoading } = useLoading();
  const { printMode, setPrintMode } = usePrintMode();
  const { searchQuery, setSearchQuery } = useSearchQuery();

  window["a"] = { isLoading, setLoading };
  return (
    <div className={`app${printMode ? " no-print" : ""}`}>
      <Router>
        <Nav {...{ searchQuery, setSearchQuery }} />
        {!!searchQuery && <Search search={searchQuery} setSearch={setSearchQuery} />}
        <div {...(searchQuery && { style: { display: "none" } })}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/c/:category" exact component={Category} />
            <Route path="/about" exact component={About} />
            <Route path="/play/:mode" exact>
              <Play {...{ printMode, setPrintMode, setLoading }} />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Layout;
