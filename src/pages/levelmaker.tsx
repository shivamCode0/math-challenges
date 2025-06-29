import React, { useEffect, useState } from "react";
import { searchModes, getQuery } from "util/searchModes";
import { Base64 } from "util/base64";
import Head from "next/head";

function LevelMaker() {
  const [gamemode, setGamemode] = useState<"countdown" | "timed">("countdown");
  const [numOfQ, setNumOfQ] = useState(10);
  const [timeSeconds, setTimeSeconds] = useState(30);
  const [levels, setLevels] = useState<{ [k: string]: string }>({});
  const [levelSearchText, setLevelSearchText] = useState("");
  const [levelName, setLevelName] = useState("");

  useEffect(() => {
    import("bootstrap/js/dist/dropdown");
    window["Base64"] = Base64;
  }, []);

  function generateLevel() {
    if (Object.keys(levels).length === 0) return void alert("No levels selected");
    if (!levelName) return void alert("Level name is required");

    let data = {
      n: levelName,
      gm: gamemode,
      qc: numOfQ,
      ts: timeSeconds,
      l: Object.keys(levels).sort((a, b) => a.localeCompare(b)),
    };

    let customModeId = Base64.encode(JSON.stringify(data));
    window.location.href = `/play/custom/${customModeId}`;
  }

  return (
    <div className="container mt-3">
      <Head>
        <title>Level Maker</title>
      </Head>

      <h1 className="text-center">Level Maker</h1>
      <hr />
      <p>Make your own compound level that has questions from existing levels. Pick and choose the settings you want, and send your custom level to anyone.</p>

      <div className="mb-3">
        <label className="me-2" htmlFor="levelname">
          Custom Level Name
        </label>
        <input type="text" className="form-control w-auto d-inline" id="levelname" value={levelName} onChange={(e) => setLevelName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="me-2" htmlFor="gamemode">
          Gamemode
        </label>
        <div className="btn-group" role="group">
          <button className={`btn ${gamemode === "countdown" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setGamemode("countdown")}>
            Countdown
          </button>
          <button className={`btn ${gamemode === "timed" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setGamemode("timed")}>
            Timed
          </button>
        </div>
      </div>

      {gamemode === "timed" ? (
        <div>
          <label className="me-2" htmlFor="numOfQ">
            Number of Questions
          </label>
          <input type="number" className="form-control w-auto d-inline" id="numOfQ" value={numOfQ} onChange={(e) => setNumOfQ(parseInt(e.target.value))} />
        </div>
      ) : (
        <div>
          <label className="me-2" htmlFor="timeSeconds">
            Time (seconds)
          </label>
          <input type="number" className="form-control w-auto d-inline" id="timeSeconds" value={timeSeconds} onChange={(e) => setTimeSeconds(parseInt(e.target.value))} />
        </div>
      )}
      <div className="my-3">
        <label className="me-2" htmlFor="levels">
          Level(s)
        </label>
        <div>
          <button className="btn btn-outline-primary dropdown-toggle me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            {Object.keys(levels).length > 0 ? `Levels Selected (${Object.keys(levels).length})` : "Select Levels"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <div className="dropdown-item">
                <input type="text" className="form-control" value={levelSearchText} onChange={(e) => setLevelSearchText(e.target.value)} />
              </div>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            {(() => {
              let resModes = searchModes(getQuery(levelSearchText)).filter(([k]) => !levels[k]);
              return resModes.length > 15 ? (
                <>
                  {resModes.slice(0, 15).map((v) => (
                    <li key={v[0]}>
                      <button className="dropdown-item" onClick={() => setLevels((pv) => ({ ...pv, [v[0]]: v[1].name }))}>
                        {v[1].name}
                      </button>
                    </li>
                  ))}
                  <li className="dropdown-item">...</li>
                </>
              ) : (
                resModes.map((v) => (
                  <li key={v[0]}>
                    <button className="dropdown-item" onClick={() => setLevels((pv) => ({ ...pv, [v[0]]: v[1].name }))}>
                      {v[1].name}
                    </button>
                  </li>
                ))
              );
            })()}
            <li>
              <hr className="dropdown-divider" />
            </li>
          </ul>

          <ul className="list-group mt-3" style={{ maxWidth: "25rem" }}>
            {Object.entries(levels).map(([k, v]) => (
              <li key={k} className="list-group-item d-flex justify-content-between align-items-center">
                {v}
                {/* <span className="badge bg-primary rounded-pill">14</span> */}
                <button
                  className="btn btn-sm btn-outline-danger p-1 py-0"
                  onClick={() =>
                    setLevels((pv) => {
                      let { [k]: _, ...newLevels } = { ...pv };
                      return newLevels;
                    })
                  }
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <button className="btn btn-primary" onClick={() => generateLevel()}>
          Generate Level
        </button>
      </div>
    </div>
  );
}

export default LevelMaker;
