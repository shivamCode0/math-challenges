import React from "react";
import Head from "next/head";

function Error404() {
  return (
    <div className="container text-center mt-3">
      <Head>
        <title>Page Not Found - Math Challenges</title>
      </Head>
      <h1 className="text-center">Page Not Found</h1>
      <hr />
      <p>Sorry, the page you are looking for is not found. Please contact us if you believe this is a mistake.</p>
    </div>
  );
}

export default Error404;
