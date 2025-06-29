import katex from "katex";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AMCProblem } from "types";
import { makeBatch, randomProblems } from "util/amc";
import { titleCleanup } from "util/amc-helper";
import useFetch from "util/useFetch";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       batch: await randomProblems(5),
//     },
//   };
// };

function AMCTrainer() {
  // const { data: batch, error } = useFetch<AMCProblem[]>("/api/amcproblems?n=5");
  const [isLoading, setIsLoading] = useState(true);
  const [batch, setBatch] = useState<AMCProblem[]>(null);
  // if (typeof window !== "undefined") console.log(batch);

  function fixHTML(html: string) {
    return html
      .split("$$")
      .map((x, i) =>
        i % 2 === 0
          ? x
          : katex.renderToString(x, {
              throwOnError: false,
            })
      )
      .join("")
      .split("$%$")
      .map((x, i) =>
        i % 2 === 0
          ? x
          : katex.renderToString(x, {
              throwOnError: false,
              displayMode: true,
            })
      )
      .join("");
  }

  function regen() {
    localStorage.removeItem("mathchallenges_amc_batch1");
    setBatch(null);
  }

  useEffect(() => {
    if (!batch) {
      let a = localStorage.getItem("mathchallenges_amc_batch1");
      if (a) setBatch(JSON.parse(a));
      else {
        fetch("/api/amcproblems?n=5")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setBatch(data);
            localStorage.setItem("mathchallenges_amc_batch1", JSON.stringify(data));
          })
          .catch((err) => alert(err))
          .finally(() => setIsLoading(false));
      }
    }
  }, [batch]);

  return (
    <div className="container mt-3 amc-root">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
          integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
          crossOrigin="anonymous"
        />
      </Head>
      <h1 className="text-center">AMC Trainer</h1>
      <hr />
      <button className="btn btn-primary mb-3" onClick={regen}>
        Regenerate
      </button>
      {batch ? (
        batch.map((v) => (
          <div key={v.title} className="card mb-3">
            <div className="card-header">{titleCleanup(v.title)}</div>
            <div className="card-body">
              <p dangerouslySetInnerHTML={{ __html: fixHTML(v.problem) }} />
              {/* <p>{v.solutions}</p> */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <div className="spinner-border" style={{ height: "3rem", width: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AMCTrainer;
