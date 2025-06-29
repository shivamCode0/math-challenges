import Nav from "./Nav";
import Search from "./Search";
import { useLoading } from "../contexts/LoadingContext";
import { usePrintMode } from "../contexts/PrintModeContext";
import { useSearchQuery } from "../contexts/SearchQueryContext";
import { useDarkMode } from "contexts/useDarkMode";

function Layout({ children }) {
  const { printMode } = usePrintMode();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const dm = useDarkMode();

  return (
    <div className={`app${printMode ? " no-print" : ""}${dm.darkModeEnabled ? " dark-on" : ""}`}>
      <Nav {...{ searchQuery, setSearchQuery }} />
      {!!searchQuery && <Search search={searchQuery} setSearch={setSearchQuery} />}
      <div {...(searchQuery && { style: { display: "none" } })}>{children}</div>
    </div>
  );
}

export default Layout;
