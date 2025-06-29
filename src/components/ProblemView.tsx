/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { ProblemType } from "util/gen";
import xIcon from "img/x.svg";
import checkIcon from "img/check.svg";
import { Problem } from "types";

function useAsyncReference<T>(value: T, isProp = false) {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  function updateState(newState1) {
    let newState = typeof newState1 === "function" ? newState1(ref.current) : newState1;
    if (!Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender((s) => !s);
    }
  }

  if (isProp) {
    ref.current = value;
    return ref;
  }

  return [ref, updateState] as any;
}

const ProblemView = ({
  problem,
  selectAns,
  showAns,
  newProblem,
  answerNumber,
  setAnsCorrectHistory,
  setShowAns,
}: {
  problem: Problem;
  selectAns(v: any): void;
  showAns: boolean;
  newProblem(): void;
  answerNumber(v: string): any;
  setAnsCorrectHistory: any;
  setShowAns: any;
}) => {
  const [ansText, setAnsText] = useState("");
  const [verifiers, setVerifiers] = useAsyncReference<[string, () => boolean][]>([]);

  function answerText() {
    answerNumber(ansText);
    setAnsText("");
  }

  function customAnswer() {
    let correct = verifiers.current.map((v) => v[1]()).every((v) => v);
    setVerifiers([]);
    setAnsCorrectHistory((pv) => [...pv, correct ? 1 : 0]);
    if (!correct) setShowAns(true);
    else newProblem();
  }

  const CustomAnswerInput: Parameters<Problem["ansCustom"]>[0] =
    // eslint-disable-next-line react/display-name
    ({ isCorrect: f1, ans }) => {
      const [input, setInput] = useState("");
      const [id, setId] = useState("");
      let f = f1 || (() => ans == Number.parseFloat(input));
      useEffect(() => setId(nanoid(12)), []);
      useEffect(() => {
        if (id) setVerifiers((pv) => [...pv.filter(([i]) => i !== id), [id, () => f(Number.parseFloat(input))]]);
        return () => {
          if (id) setVerifiers((pv) => pv.filter(([i]) => i !== id));
        };
      }, [input, id]);

      return <input className="form-control" style={{ width: "max-content", maxWidth: "6rem", display: "inline" }} type="text" value={input} onChange={(e) => setInput(e.target.value)} />;
    };

  return useMemo(
    () => (
      <>
        {problem && (
          <div>
            <div style={{ fontSize: "1.25em", textAlign: "center" }}>{problem.q}</div>
            <br />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {showAns ? (
                <>
                  <div style={{ textAlign: "center" }} className="pb-2 w-100">
                    {problem.type === ProblemType.Custom
                      ? problem.ansCustom(({ ans }) => (
                          <span className="form-control" style={{ width: "max-content", display: "inline" }}>
                            <img src={checkIcon.src} className="card-img-top w-auto m-0 me-2" alt="" style={{ height: "1.5rem" }}></img> {ans}
                          </span>
                        ))
                      : problem.opts.map((v) => (
                          <div
                            style={{ display: "inline-block", border: "1px solid gray", borderRadius: "0.25em", minWidth: "6em" }}
                            className="my-2 mx-3 btn-lg py-2 px-3"
                            key={typeof v.text === "object" ? JSON.stringify(v.text.props.tex || v.text.props) : v.text}
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
                    className="ms-2 form-control"
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
              ) : problem.type === ProblemType.Custom ? (
                <div className="text-center w-100">
                  <div>{problem.ansCustom(CustomAnswerInput)}</div>
                  <br />
                  <button className="btn btn-success" onClick={() => customAnswer()}>
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
        )}
      </>
    ),
    [problem, showAns, ansText]
  );
};

export default ProblemView;
