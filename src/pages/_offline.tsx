import React from "react";
import Head from "next/head";

function ErrorOffline() {
  return (
    <div className="container text-center mt-3">
      <Head>
        <title>Error - No Connection</title>
      </Head>
      <h1 className="text-center">Error - No Connection</h1>
      <hr />
      <p>Sorry, this page could not be loaded at this time.</p>
    </div>
  );
}

export default ErrorOffline;
