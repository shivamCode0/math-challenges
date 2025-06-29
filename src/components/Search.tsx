import React from "react";
import { Link } from "react-router-dom";
import levels from "./../util/levels";
import modes from "./../util/modes";

function Search({ search, setSearch }: { search: string; setSearch(arg0: any): any }) {
  let searchQ: string[] = [
    ...new Set(
      search
        .trim()
        .toLowerCase()
        .split(/[\s,]+/gi)
        .filter((v) => v.length > 0)
    ),
  ];
  console.log(searchQ);
  /* prettier-ignore */ const results = Object.entries(modes).filter(([id, { name }]) => searchQ.every((v) => [id, name].map((v2) => v2.replace(/(<([^>]+)>)/ig, "").toLowerCase()).some((v3) => v3.includes(v) || v.includes(v3)) || Object.values(levels).some((v2) => v2.filter((v3) => v3.name.toLowerCase().includes(v)).some((v3) => v3.modes.some((v4) => v4.some((v5) => v5.mode === id))))));

  const highlightSearch = (k: string): string => searchQ.reduce((ac, cv) => boldQuery(ac, cv), k);

  const boldQuery = (str: string, query: string) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) return str;
    const l = q.length;
    return str.substr(0, x) + "<b>" + str.substr(x, l) + "</b>" + str.substr(x + l);
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
            <Link
              to={`/play/${k}`}
              style={{ textDecoration: "none", fontSize: "1.125em" }}
              className="text-indigo"
              dangerouslySetInnerHTML={{ __html: highlightSearch(v.name) }}
              onClick={() => setSearch("")}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;

// .replace(/(?:\^)([a-zA-Z0-9]+)/g, "<sup>$1</sup>");
