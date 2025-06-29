import levels from "util/levels";
import modes from "util/modes";

export function getQuery(search: string) {
  let searchQ: string[] = [
    ...new Set(
      search
        .trim()
        .toLowerCase()
        .split(/[\s,]+/gi)
        .filter((v) => v.length > 0)
    ),
  ];
  return searchQ;
}

export function searchModes(query: string[]) {
  const results = Object.entries(modes).filter(([id, { name }]) =>
    query.every(
      (v) =>
        [id, name].map((v2) => v2.replace(/(<([^>]+)>)/gi, "").toLowerCase()).some((v3) => v3.includes(v) || v.includes(v3)) ||
        Object.values(levels).some((v2) => v2.filter((v3) => v3.name.toLowerCase().includes(v)).some((v3) => v3.modes.some((v4) => v4.some((v5) => v5.mode === id))))
    )
  );
  return results;
}
