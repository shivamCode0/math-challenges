/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { Problem, ProblemType } from "../util/gen";
import xIcon from "./../img/x.svg";
import checkIcon from "./../img/check.svg";

const ProblemView = ({ problem, selectAns, showAns, newProblem, answerNumber }: { problem: Problem; selectAns(v: any): void; showAns: boolean; newProblem(): void; answerNumber(v: string): any }) => {
  const [ansText, setAnsText] = useState("");

  window["b"] = () => ansText;

  function answerText() {
    answerNumber(ansText);
    setAnsText("");
  }

  function a<T>(v: T): T {
    console.log(v);
    return v;
  }

  return useMemo(
    () => (
      <div>
        <div style={{ fontSize: "1.25em", textAlign: "center" }}>{problem.q}</div>
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {showAns ? (
            <>
              <div style={{ textAlign: "center" }} className="pb-2 w-100">
                {problem.opts.map((v) => (
                  <div
                    style={{ display: "inline-block", border: "1px solid gray", borderRadius: "0.25em", minWidth: "6em" }}
                    className="my-2 mx-3 btn-lg py-2 px-3"
                    key={a(typeof v.text === "object" ? JSON.stringify(v.text.props.tex || v.text.props) : v.text)}
                  >
                    <img src={[xIcon, checkIcon][v.correct ? 1 : 0].src} className="card-img-top w-auto m-0 me-2" alt="" style={{ height: "2rem" }}></img>
                    {/* <i className={`card-img-top fas ${["fa-xmark text-danger", "fa-check text-success"][v.correct ? 1 : 0]}`} style={{ fontSize: "1.5em" }} /> */}

                    {v.text}
                  </div>
                ))}
              </div>
              <br />
              <button type="button" className="btn btn-primary" onClick={() => newProblem()}>
                Next
              </button>
            </>
          ) : problem.type === ProblemType.Text ? (
            <div className="input-group" style={{ maxWidth: "25rem" }}>
              <input
                className="ml-2 form-control"
                type="text"
                onKeyUp={(e) => void (e.key === "Enter" && answerText())}
                value={ansText}
                onChange={(e) => setAnsText(e.target.value)}
                style={{ width: "16px" }}
                placeholder="Answer"
              />
              <button className="btn btn-success" onClick={() => answerText()} disabled={!ansText.trim()}>
                Done
              </button>
            </div>
          ) : (
            problem.opts.map((v) => (
              <button type="button" className="btn btn-outline-primary m-2 btn-lg" onClick={() => selectAns(v)} key={nanoid(3)} style={{ minWidth: "6em" }}>
                {v.text}
              </button>
            ))
          )}
        </div>
      </div>
    ),
    [problem, showAns, ansText]
  );
};

export default ProblemView;
