import katex from "katex";
import React, { useState } from "react";
import { AMCProblem } from "types";
import { formatLatex, titleCleanup } from "util/amc-helper";

function CompProblem({ v }: { v: AMCProblem }) {
  const [showSolution, setShowSolution] = useState(false);

  function fixHTML(html: string) {
    return html
      .split("$$")
      .map((x, i) => (i % 2 === 0 ? x : katex.renderToString(formatLatex(x), { throwOnError: false })))
      .join("")
      .split("$%$")
      .map((x, i) => (i % 2 === 0 ? x : katex.renderToString(formatLatex(x), { throwOnError: false, displayMode: true })))
      .join("");
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        <div className="row">
          <div className="col-6">{titleCleanup(v.title)}</div>
          <div className="col-6 text-end">
            <button className="btn btn-secondary btn-sm" onClick={() => setShowSolution((pv) => !pv)}>
              {showSolution ? "Hide" : "Show"} Solution
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div dangerouslySetInnerHTML={{ __html: fixHTML(v.problem) }} />
        {showSolution && (
          <>
            <hr />
            <div className="solutions" style={{ fontSize: "0.875em" }} dangerouslySetInnerHTML={{ __html: fixHTML(v.solutions) }} />
          </>
        )}
      </div>
    </div>
  );
}

export default CompProblem;
