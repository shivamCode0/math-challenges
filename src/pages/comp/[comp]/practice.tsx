/* eslint-disable react-hooks/exhaustive-deps */
import CompProblem from "components/CompProblem";
import type { GetStaticPaths, GetStaticProps } from "next";
// import katex from "katex";
// import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AMCProblem } from "types";
import { useLocalStorage } from "util/useLocalStorage.1";
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
let mapping = {
  amc8: "AMC 8",
  amc10: "AMC 10",
  amc12: "AMC 12",
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: Object.keys(mapping).map((x) => ({ params: { comp: x } })), fallback: false };
};
export const getStaticProps: GetStaticProps = async (context) => {
  let comp = context.params.comp?.toString();

  let filterText = mapping[comp];
  if (!filterText) return { notFound: true };
  return {
    props: {
      filterText,
      comp,
    }, // will be passed to the page component as props
  };
};

function AMCPractice({ filterText, comp }) {
  // const { data: batch, error } = useFetch<AMCProblem[]>("/api/amcproblems?n=5");
  const [problem, setProblem] = useLocalStorage<AMCProblem>(`mathchallenges_${comp}_practice`, undefined);
  // if (typeof window !== "undefined") console.log(batch);

  function regen() {
    // localStorage.removeItem("mathchallenges_amc_batch1");
    setProblem(null);
  }

  useEffect(() => {
    if (problem === null) {
      // let a = localStorage.getItem("mathchallenges_amc_batch1");
      // if (a) setBatch(JSON.parse(a));
      // else {
      console.log("fetching");
      fetch(`/api/amcproblems?q=${filterText}&n=1`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setProblem(data[0]);
          // localStorage.setItem("mathchallenges_amc_batch1", JSON.stringify(data));
        })
        .catch((err) => alert(err));
      // }
    } else console.log(problem);
  }, [problem]);

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
      <h1 className="text-center">{filterText} - AMC Trainer</h1>
      <p className="text-center">
        Credits go to <a href="https://amctrivial.com/">AMC Trivial</a> and the <a href="https://artofproblemsolving.com/wiki/">AoPS wiki</a> for making this possible.
      </p>
      <hr />
      {problem ? (
        <div>
          {<CompProblem v={problem} />}
          <div className="text-center"></div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border" style={{ height: "3rem", width: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <button className="btn btn-primary mb-3" onClick={regen}>
        New Problem
      </button>
    </div>
  );
}

export default AMCPractice;
