import React, { useContext, useState } from "react";

type SearchQueryContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchQueryContext = React.createContext<SearchQueryContextType>(null);

export function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const state: SearchQueryContextType = {
    searchQuery,
    setSearchQuery,
  };

  return <SearchQueryContext.Provider value={state}>{children}</SearchQueryContext.Provider>;
}

export function useSearchQuery() {
  return useContext(SearchQueryContext);
}
