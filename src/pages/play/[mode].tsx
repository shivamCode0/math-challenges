/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProblemView from "components/ProblemView";
import { usePrintMode } from "contexts/PrintModeContext";
import checkIcon from "img/check.svg";
import xIcon from "img/x.svg";
import timeIcon from "img/time.svg";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import ReactDOM from "react-dom";
import { Base64 } from "util/base64";
import { formatSeconds, roundDec, shuffle } from "util/methods";
import modes from "util/modes";
import MetaLD from "components/MetaLD";
// import { useLocalStorage } from "usehooks-ts";
import PrintMode from "components/PrintMode";
import Scoreboard from "components/Scoreboard";
import { Problem } from "types";

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: Object.keys((await import("util/modes")).default).map((m) => ({ params: { mode: m } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async function (ctx) {
  const modeId: string = ctx.params?.mode as any;
  const customModeId: string = ctx.params?.custommode as any;

  if (customModeId) return { props: { mode: customModeId, customMode: true } };
  else {
    if (!modeId) return { notFound: true };
    const mode = (await import("util/modes")).default[modeId];
    if (!mode) return { notFound: true };

    return { props: { mode: modeId, customMode: false } };
  }
};

function getCustomMode(customMode: string): typeof modes[string] {
  try {
    let decodedData = JSON.parse(Base64.decode(customMode));
    // console.log(decodedData);
    let newMode: typeof modes[string] & { gamemode: "countdown" | "timed" } = {
      name: decodedData.n,
      time: decodedData.ts,
      amount: decodedData.qc as any,
      gen: shuffle(decodedData.l.map((v: string) => modes[v].gen) as (() => Promise<Problem>)[])[0],
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
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printAmountQuestions, setPrintAmountQuestions] = useState(10);
  const [gamemode, setGamemode] = useState<"countdown" | "timed">(null);

  const game: typeof modes[string] & { gamemode?: "countdown" | "timed" } = customMode ? getCustomMode(mode) : modes[mode];

  const { printMode, setPrintMode } = usePrintMode();
  // const [dataLS, setDataLS] = useLocalStorage("mathchallenges_levels", {});

  function newProblem() {
    console.log(1);
    game.gen().then((p) => setProblem(p));
    console.log(2);
    setShowAns(false);
    console.log(3);
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

    if (gm === "countdown") setTime(game.time * 10);
    else if (gm === "timed") setTime(0);

    newProblem();
    setAnsCorrectHistory([]);
  }

  useEffect(() => {
    if (!game) return;

    if (gamemode === "countdown") {
      let timeoutID: NodeJS.Timeout;
      if (gameStarted && time > 0) timeoutID = setTimeout(() => setTime((pv) => pv - 1), 100);
      if (time === 0) {
        setGameStarted(false);
        setGameEnded(true);
      }
      return () => clearTimeout(timeoutID);
    } else if (gamemode === "timed") {
      let timeoutID: NodeJS.Timeout;
      if (gameStarted) timeoutID = setTimeout(() => gameStarted && setTime((pv) => pv + 1), 100);
      if (ansCorrectHistory.length === game.amount) {
        setGameStarted(false);
        setGameEnded(true);
      }

      return () => clearTimeout(timeoutID);
    }
  }, [time, gamemode, ansCorrectHistory, gameStarted]);
  //

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

        {game.meta && <MetaLD game={game} />}
      </Head>

      <div className="container">
        {(showPrintModal || printMode) && ReactDOM.createPortal(<PrintMode game={game} printAmountQuestions={printAmountQuestions} />, document.getElementById("print-page-root"))}

        <h1 className="text-center my-3" dangerouslySetInnerHTML={{ __html: game?.name }} />
        {customMode && <p className="text-center">Custom Level</p>}
        <hr />
        {gameStarted && !gameEnded ? (
          <div style={{ position: "relative" }}>
            <div>
              <div className="p-auto mx-auto border-dark mb-3" style={{ height: "3rem", width: "6rem", border: "4px solid", textAlign: "center", position: "relative", borderRadius: "8px" }}>
                <p className="mt-1 mb-0" style={{ textAlign: "center", fontSize: "1.25rem" }}>
                  <img src={timeIcon.src} className="rotate-inf" height={32} width={32} alt="time" />
                  {/* <TimeSymbol /> */}
                  {formatSeconds(time)}
                </p>
              </div>
              {gamemode === "timed" && (
                <p className="text-center mt-2">
                  {ansCorrectHistory.length + (showAns ? 0 : 1)} of {game?.amount}
                </p>
              )}
            </div>
            <ProblemView {...{ problem, selectAns, showAns, newProblem, answerNumber, setAnsCorrectHistory, setShowAns }} />
          </div>
        ) : !gameStarted && !gameEnded ? (
          <div className="text-center">
            <p>Countdown: Answer as many questions as you can in under {game?.time} seconds.</p>
            <p>Timed: Answer {game?.amount} questions correctly as fast as you can.</p>
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
            {gamemode === "countdown" ? (
              <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => startGame("timed")}>
                Play Timed
              </button>
            ) : (
              <button type="button" className="btn btn-primary mt-3 me-2" onClick={() => startGame("countdown")}>
                Play Countdown
              </button>
            )}
            <button type="button" className="btn btn-primary mt-3" onClick={() => setShowPrintModal(true)}>
              Make Worksheet
            </button>
          </div>
        ) : gameEnded ? (
          <>
            <div>
              <Scoreboard {...{ game, ansCorrectHistory, gamemode, time }} />
            </div>
            <div className="text-center mt-4" style={{}}>
              <Link href="/" className="btn btn-secondary m-2">
                Go Back
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
