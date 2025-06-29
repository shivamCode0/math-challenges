import React from "react";
import Link from "next/link";
import { getQuery, searchModes } from "./../util/searchModes";

function Search({ search, setSearch }: { search: string; setSearch(arg0: any): any }) {
  let searchQ = getQuery(search);
  let results = searchModes(searchQ);

  const highlightSearch = (k: string): string => searchQ.reduce((ac, cv) => boldQuery(ac, cv), k);

  const boldQuery = (str: string, query: string) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) return str;
    const l = q.length;
    return `${str.substr(0, x)}<b>${str.substr(x, l)}</b>${str.substr(x + l)}`;
  };

  return (
    <div className="container pt-4">
      <h1 className="text-center">Search Challenges</h1>
      <h2 className="text-center">
        {results.length} Result{results.length !== 1 ? "s" : ""}
      </h2>
      <ul>
        {results.map(([k, v]) => (
          <li key={k}>
            <Link href={`/play/${k}`}>
              <a
                style={{
                  textDecoration: "none",
                  fontSize: "1.125em",
                }}
                className="text-indigo"
                dangerouslySetInnerHTML={{ __html: highlightSearch(v.name) }}
                onClick={() => setSearch("")}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;

// .replace(/(?:\^)([a-zA-Z0-9]+)/g, "<sup>$1</sup>");
