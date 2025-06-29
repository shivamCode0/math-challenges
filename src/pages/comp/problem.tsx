import CompProblem from "components/CompProblem";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { AMCProblem } from "types";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
export const getStaticProps: GetStaticProps = async (context) => {
  let comp = context.params.p?.toString();
  if (!comp) return { notFound: true };

  // let filterText = mapping[comp];
  // if (!filterText) return { notFound: true };
  if (!filterText) return { notFound: true };
  return {
    props: { filterText, comp }, // will be passed to the page component as props
  };
};

function AMCProblemView({ problem }) {
  const [amcproblem, setAmcproblem] = useState<AMCProblem>(undefined);

  useEffect(() => {
    if (problem && !amcproblem) {
      fetch(`/api/amcproblems?v=${problem}`)
        .then((res) => res.json())
        .then((data) => {
          setAmcproblem(data[0]);
        })
        .catch((err) => alert(err));
    }
  }, [amcproblem, problem]);

  return (
    <div className="container mt-3">
      <Head>
        <title>{`${amcproblem?.title} - Math Challenges`}</title>
        <meta name="description" content="Math Competition training problems and practice" key="desc" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
          integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
          crossOrigin="anonymous"
        />
      </Head>
      <h1 className="text-center">{amcproblem?.title}</h1>
      <p className="text-center">
        Credits go to <a href="https://amctrivial.com/">AMC Trivial</a> and the <a href="https://artofproblemsolving.com/wiki/">AoPS wiki</a> for making this possible.
      </p>
      <hr />
      {amcproblem && <CompProblem v={amcproblem} />}
    </div>
  );
}

export default AMCProblemView;
