import katex from "katex";
import React, { useState } from "react";
import { AMCProblem } from "types";
import { formatLatex, titleCleanup } from "util/amc-helper";

function CompProblem({ v }: { v: AMCProblem }) {
  const [showSolution, setShowSolution] = useState(false);
  const [ansTextInp, setAnsTextInp] = useState("");

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
        {v.answer && (
          <div className="input-group">
            <input className="form-control" placeholder="Answer" type="text" value={ansTextInp} onChange={(e) => setAnsTextInp(e.target.value)} />
            <button
              className="btn btn-primary"
              onClick={() => {
                let inpAns = ansTextInp.trim().toUpperCase();
                let realAns = v.answer.trim().toUpperCase();
                if ("ABCDE".split("").includes(realAns) && !"ABCDE".split("").includes(inpAns)) return void alert("Answer must be either A, B, C, D, or E");
                if (inpAns === realAns) alert("Correct!");
                else alert("Incorrect!");
                setAnsTextInp("");
                // setShowSolution(true);
              }}
            >
              Submit
            </button>
          </div>
        )}
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
