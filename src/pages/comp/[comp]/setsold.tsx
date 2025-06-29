/* eslint-disable react-hooks/exhaustive-deps */
import CompProblem from "components/CompProblem";
// import katex from "katex";
// import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AMCProblem } from "types";
import { useLocalStorage } from "usehooks-ts";
// import { makeBatch, randomProblems } from "util/amc";
// import { titleCleanup } from "util/amc-helper";
// import useFetch from "util/useFetch";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       batch: await randomProblems(5),
//     },
//   };
// };

function AMCSets() {
  // const { data: batch, error } = useFetch<AMCProblem[]>("/api/amcproblems?n=5");
  const [batch, setBatch] = useLocalStorage<AMCProblem[]>("mathchallenges_amc_batch1", null);
  // if (typeof window !== "undefined") console.log(batch);

  function regen() {
    // localStorage.removeItem("mathchallenges_amc_batch1");
    setBatch(null);
  }

  useEffect(() => {
    if (!batch) {
      // let a = localStorage.getItem("mathchallenges_amc_batch1");
      // if (a) setBatch(JSON.parse(a));
      // else {
      fetch("/api/amcproblems?q=amc&n=5")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setBatch(data);
          // localStorage.setItem("mathchallenges_amc_batch1", JSON.stringify(data));
        })
        .catch((err) => alert(err));
      // }
    } else console.log(batch);
  }, [batch]);

  return (
    <div className="container-md mt-3 amc-root">
      <Head>
        <title>Competition Problems</title>
        <meta name="description" content="Math Competition training problems and practice" key="desc" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
          integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
          crossOrigin="anonymous"
        />
      </Head>
      <h1 className="text-center">AMC Trainer</h1>
      <p className="text-center">
        Credits go to <a href="https://amctrivial.com/">AMC Trivial</a> and the <a href="https://artofproblemsolving.com/wiki/">AoPS wiki</a> for making this possible.
      </p>
      <hr />
      <button className="btn btn-primary mb-3" onClick={regen}>
        Regenerate
      </button>
      {batch ? (
        batch.map((v) => <CompProblem key={v.title} v={v} />)
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

export default AMCSets;
