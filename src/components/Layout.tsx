import Nav from "./Nav";
import Search from "./Search";
import { useLoading } from "../contexts/LoadingContext";
import { usePrintMode } from "../contexts/PrintModeContext";
import { useSearchQuery } from "../contexts/SearchQueryContext";

function Layout({ children }) {
  const { printMode } = usePrintMode();
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <div className={`app${printMode ? " no-print" : ""}`}>
      <Nav {...{ searchQuery, setSearchQuery }} />
      {!!searchQuery && <Search search={searchQuery} setSearch={setSearchQuery} />}
      <div {...(searchQuery && { style: { display: "none" } })}>{children}</div>
    </div>
  );
}

export default Layout;
