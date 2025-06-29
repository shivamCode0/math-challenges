import Head from "next/head";
import Link from "next/link";
import React from "react";

function AMCMainPage() {
  return (
    <div className="container mt-3">
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {[
          { name: "AMC 8", path: "/comp/amc8/practice", color: "aqua" },
          { name: "AMC 10", path: "/comp/amc10/practice", color: "blue" },
          { name: "AMC 12", path: "/comp/amc12/practice", color: "red" },
        ].map((v) => (
          <Link href={v.path} key={v.name}>
            <a className="category-item category-item-2 card-1" style={{ borderColor: v.color }}>
              {/* <img src={v.img} className="card-img-top" alt="" /> */}
              <span className={`imgcolor-${v.color}`}>
                <img src={`https://cdn.shivam.pro/app-static-data/images/cubes-thumbnail/cubes-blue.png`} alt="" className={`card-img-top trans-filter dark-image`} />
              </span>
              <div className="card-body">
                <h4 className="card-title text-center mb-0">{v.name}</h4>
                {/* <p className="card-text">{v.desc}</p> */}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AMCMainPage;
