/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Problem, ProblemType } from "../../util/gen";
import checkIcon from "./../../img/check.svg";
import xIcon from "./../../img/x.svg";
import modes from "../../util/modes";
import ProblemView from "../../components/ProblemView";
import { roundDec } from "../../util/methods";
import ReactDOM from "react-dom";
import { nanoid } from "nanoid";
import logo from "./../../img/math-app.png";
import Modal from "react-bootstrap/Modal";
import { GetStaticPaths, GetStaticProps } from "next";
import { usePrintMode } from "../../contexts/PrintModeContext";
import Link from "next/link";
import Head from "next/head";
import { Base64 } from "util/base64";
import { shuffle } from "../../util/methods";

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: Object.keys(modes).map((m) => ({ params: { mode: m } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async function (ctx) {
  const modeId: string = ctx.params?.mode as any;
  const customModeId: string = ctx.params?.custommode as any;

  if (customModeId) return { props: { mode: customModeId, customMode: true } };
  else {
    if (!modeId) return { notFound: true };
    const mode = modes[modeId];
    if (!mode) return { notFound: true };

    return { props: { mode: modeId, customMode: false } };
  }
};

function getCustomMode(customMode: string) {
  try {
    let decodedData = JSON.parse(Base64.decode(customMode));
    console.log(decodedData);
    let newMode: typeof modes[string] & { gamemode: "countdown" | "timed" } = {
      name: decodedData.n,
      time: decodedData.ts,
      amount: decodedData.qc as any,
      gen: shuffle(decodedData.l.map((v: string) => modes[v].gen) as (() => Problem)[])[0],
      gamemode: decodedData.gm,
    };
    return newMode;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function Play({ mode, customMode }: { mode: string; customMode: boolean }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [time, setTime] = useState(-1);
  const [problem, setProblem] = useState<Problem>(null);
  const [ansCorrectHistory, setAnsCorrectHistory] = useState<number[]>([]);
  const [showAns, setShowAns] = useState(false);
  const [ans, setAns] = useState("");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printAmountQuestions, setPrintAmountQuestions] = useState(10);
  const [gamemode, setGamemode] = useState<"countdown" | "timed">(null);

  // let { mode }: { mode: string } = useParams();
  let game: typeof modes[string] & { gamemode?: "countdown" | "timed" } = customMode ? getCustomMode(mode) : modes[mode];

  const { printMode, setPrintMode } = usePrintMode();

  function newProblem() {
    setProblem(game.gen());
    setShowAns(false);
  }

  function printWS() {
    setTimeout(() => {
      setPrintMode(true);
    }, 400);
  }

  function selectAns(a: Problem["opts"][number]) {
    setAnsCorrectHistory((pv) => [...pv, a.correct ? 1 : 0]);
    if (!a.correct) setShowAns(true);
    else newProblem();
  }
  function answerNumber(a: string) {
    let n = parseFloat(a.trim().replace(/[/\\.'"[\]|]$/g, ""));

    let ans = typeof problem.ans == "number" ? problem.ans : parseFloat(problem.ans);

    let correct = roundDec(ans, 2) === roundDec(n, 2);
    setAnsCorrectHistory((pv) => [...pv, correct ? 1 : 0]);
    if (!correct) setShowAns(true);
    else newProblem();
  }

  function startGame(gm: typeof gamemode) {
    setGameStarted(true);
    setGameEnded(false);
    setGamemode(gm);

    if (gm === "countdown") {
      setTime(game.time);
    } else if (gm === "timed") {
      setTime(0);
    }

    newProblem();
    setAnsCorrectHistory([]);
  }

  useEffect(() => {
    if (!game) return;

    if (gamemode === "countdown") {
      let timeoutID: NodeJS.Timeout;
      if (gameStarted && time > 0) timeoutID = setTimeout(() => setTime((pv) => pv - 1), 1000);
      if (time === 0) {
        setGameStarted(false);
        setGameEnded(true);
      }
      return () => clearTimeout(timeoutID);
    } else if (gamemode === "timed") {
      let timeoutID: NodeJS.Timeout;
      if (gameStarted) timeoutID = setTimeout(() => setTime((pv) => pv + 1), 1000);
      if (ansCorrectHistory.length === game.amount) {
        setGameStarted(false);
        setGameEnded(true);
      }
      return () => clearTimeout(timeoutID);
    }
  }, [time, gamemode, ansCorrectHistory]);
  //
  function formatSeconds(totalSecs: number) {
    let m = Math.floor(totalSecs / 60);
    let s = totalSecs % 60;

    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    if (printMode) {
      setTimeout(() => {
        window.print();
        // debugger;
        setPrintMode(false);
      }, 200);
    }
  }, [printMode]);

  useEffect(() => {
    window["Base64"] = Base64;
    // import("scss/katex.scss");

    if (!gamemode && game?.gamemode) setGamemode(game.gamemode);
  }, []);

  return customMode && !game ? (
    <div>
      <Head>
        <title>Error - Invalid Custom Level</title>
      </Head>
      <div className="container text-center">
        <h1>Invalid Custom Level</h1>
        <p>The custom level is invalid.</p>
      </div>
    </div>
  ) : (
    <>
      <Head>
        <title>{`${game?.name.replace(/<sup>(.*)<\/sup>/g, `^$1`)} | Math Challenges`}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
          integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container">
        {(showPrintModal || printMode) &&
          ReactDOM.createPortal(
            <div className="print-only">
              {(() => {
                let questions = Array(printAmountQuestions)
                  .fill(null)
                  .map(() => game.gen());
                return (
                  <>
                    <nav className="navbar navbar-expand-sm navbar-light">
                      <div className="container-md">
                        <div className="text-center w-100">
                          <img src={logo.src} alt="" style={{ height: "2rem" }} className="me-2" />
                          <span className="navbar-brand me-0 me-sm-3" style={{ verticalAlign: "middle" }}>
                            {game.name} - Math Challenges
                          </span>
                        </div>
                      </div>
                    </nav>
                    <hr style={{ borderTop: "1px solid var(--bs-gray-800)" }} />
                    <div style={{ columnGap: "2rem", columnCount: 2, columnRule: "1px solid rgb(220, 220, 220)" }}>
                      {questions.map((v, i) => (
                        <div key={nanoid(6)} style={{ breakInside: "avoid" }}>
                          <div style={{ textAlign: "center", fontSize: "1.25em", fontWeight: "bold" }}>{i + 1}.</div>
                          <div style={{ textAlign: "center" }}>{v.q}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {v.type === ProblemType.Text ? (
                              <div className="input-group">
                                <input className="ms-2 form-control" type="text" style={{ width: "16px" }} />
                              </div>
                            ) : (
                              <p className="text-center mb-0">
                                {v.opts.map((v, i) => (
                                  <span key={nanoid(6)}>
                                    <b>{["A", "B", "C", "D", "E", "F", "G", "H"][i]}.</b> {v.text}&emsp;
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                          <hr style={{ borderTop: "1px solid var(--bs-gray-800)" }} />
                        </div>
                      ))}
                    </div>

                    <footer>
                      This worksheet was generated by math.shivam.pro. If you are a student, tell your teacher that you love this worksheet. If you are a teacher, share this with other teachers!
                    </footer>
                  </>
                );
              })()}
            </div>,
            document.getElementById("print-page-root")
          )}
        <h1 className="text-center my-3" dangerouslySetInnerHTML={{ __html: game.name }} />
        <hr />
        {gameStarted && !gameEnded ? (
          <div style={{ position: "relative" }}>
            <div>
              <div className="p-auto mx-auto border-primary" style={{ height: "4rem", width: "4rem", border: "4px solid", textAlign: "center", position: "relative", borderRadius: "50%" }}>
                <p style={{ margin: 0, position: "absolute", top: "50%", transform: "translateY(-50%)", textAlign: "center", width: "100%", fontSize: "1.5rem" }}>{formatSeconds(time)}</p>
              </div>
              {gamemode === "timed" && (
                <p className="text-center mt-2">
                  {ansCorrectHistory.length + (showAns ? 0 : 1)} of {game.amount}
                </p>
              )}
            </div>
            {problem && <ProblemView {...{ problem, selectAns, showAns, newProblem, answerNumber, ans, setAns }} />}
          </div>
        ) : !gameStarted && !gameEnded ? (
          <div className="text-center">
            <p>Countdown: Answer as many questions as you can in under {game.time} seconds.</p>
            <p>Timed: Answer {game.amount} questions correctly as fast as you can.</p>
            {gamemode === "countdown" ? (
              <button type="button" className="btn btn-primary btn-lg" onClick={() => startGame("countdown")}>
                {gamemode && <span className="badge rounded-pill bg-warning me-2">Selected Mode</span>}
                Play Countdown
              </button>
            ) : (
              <button type="button" className="btn btn-primary btn-lg" onClick={() => startGame("timed")}>
                {gamemode ? <span className="badge rounded-pill bg-warning me-2">Selected Mode</span> : <span className="badge rounded-pill bg-info me-1">New</span>}
                Play Timed
              </button>
            )}
            <br />
            <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => startGame("countdown")}>
              Play Countdown
            </button>
            <button type="button" className="btn btn-primary btn mt-3" onClick={() => setShowPrintModal(true)}>
              Make Worksheet
            </button>
          </div>
        ) : gameEnded ? (
          <>
            <div>
              {(() => {
                let c_t = ansCorrectHistory.reduce((a, c) => [a[0] + c, a[1] + 1], [0, 0]);
                let accuracy = c_t[0] / c_t[1];

                let c = c_t[0];
                let i = c_t[1] - c_t[0];

                let score: number;
                switch (gamemode) {
                  case "countdown":
                    score = 10 * c - 8 * i;
                    break;
                  case "timed":
                    score = ((100 / (time / 20)) * (c - i / 2)) / (c + i);
                    break;
                }

                let results: [string, string][];
                switch (gamemode) {
                  case "countdown":
                    results = [
                      ["Accuracy", `${Math.round(accuracy * 1e4) / 100}%`],
                      ["Score", `${Math.round(score)}`],
                      ["# of Problems", `${c + i}`],
                    ];
                    break;
                  case "timed":
                    results = [
                      ["Accuracy", `${Math.round(accuracy * 1e4) / 100}%`],
                      ["Score", `${Math.round(score)}`],
                      ["Time", `${formatSeconds(time)}`],
                    ];
                    break;
                }

                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="mt-2 me-3">
                      <p className="text-center mb-0" style={{ fontSize: "2.5em", fontWeight: 700 }}>
                        {results[0][1]}
                      </p>
                      <p className="text-center" style={{ fontSize: "1em", fontWeight: 700 }}>
                        {results[0][0]}
                      </p>
                    </div>
                    <div className="mx-4 mx-md-5">
                      <p className="text-center mb-0" style={{ fontSize: "3.25em", fontWeight: 700, color: score <= 0 ? "red" : undefined }}>
                        {results[1][1]}
                      </p>
                      <p className="text-center" style={{ fontSize: "1.5em", fontWeight: 700 }}>
                        {results[1][0]}
                      </p>
                    </div>
                    <div className="mt-2 ms-3">
                      <p className="text-center mb-0" style={{ fontSize: "2.5em", fontWeight: 700 }}>
                        {results[2][1]}
                      </p>
                      <p className="text-center" style={{ fontSize: "1em", fontWeight: 700 }}>
                        {results[2][0]}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="text-center mt-4" style={{}}>
              <Link href="/">
                <a className="btn btn-secondary m-2">Go Back</a>
              </Link>
              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={() => {
                  setGameStarted(false);
                  setGameEnded(false);
                  setTime(-1);
                  setAnsCorrectHistory([]);
                }}
              >
                Play Again
              </button>
            </div>
          </>
        ) : (
          "error"
        )}
        {ansCorrectHistory.length > 0 && (gameEnded || gameStarted) && (
          <div className="mt-5">
            <h3 className="text-center">Your Answers</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {ansCorrectHistory.map((v, i) => (
                <div className="mx-2" style={{ width: "3rem", border: "none" }} key={i}>
                  <img src={[xIcon, checkIcon][v].src} className="card-img-top" alt="" style={{ height: "3rem" }} />
                  {/* <div style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                  <i className={`card-img-top fas fa-3x ${["fa-xmark text-danger", "fa-check text-success"][v]}`} style={{ height: "3rem" }} />
                </div> */}
                  <div className="card-body p-0">
                    <p className="card-text text-center" style={{ fontWeight: 700, fontSize: "1.25em" }}>
                      {i + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)}>
        <Modal.Header>
          <Modal.Title>Create a Worksheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Generate a printable version of this Math Challenges level</p>
          <div className="my-3">
            <label htmlFor="print-q-amt">Amount of Questions</label>
            <input min={1} className="form-control display-inline" type="number" id="print-q-amt" value={printAmountQuestions} onChange={(e) => setPrintAmountQuestions(e.target.valueAsNumber)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShowPrintModal(false)}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={() => void setShowPrintModal(false) || printWS()}>
            Generate
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Play;
