import React from "react";
import { formatSeconds } from "util/methods";

function Scoreboard({ ansCorrectHistory, gamemode, time }: { ansCorrectHistory: number[]; gamemode: string; time: number }) {
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
}

export default Scoreboard;
