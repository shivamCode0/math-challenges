import React from "react";

function About() {
  document.title = "About | Math Challenges";
  return (
    <div className="container" style={{ width: "min(100%, 50em)" }}>
      <h1 className="text-center my-3">About Math Challenges</h1>
      <hr />
      <h2>About</h2>
      <p>
        The goal of Math Challenges is for you to test your math skills in a fun
        and fast-paced way. We created it to help anyone who wants to have fun
        and learn at the same time. If you like Math Challenges or think a
        friend would, please share Math Challenges.
      </p>
      <h2>How to Use</h2>
      <p>
        Math Challenges is very simple to use. All you have to do is select the
        category, pick a level, and start. Each level has a set amount of time
        for you to answer as many questions correctly as possible. At the end,
        you will get a score based on your answers.
      </p>

      <h2>Info</h2>
      <p>Version {process.env.REACT_APP_VERSION}</p>
      <p>
        This website was made by{" "}
        <a href="https://shivam.pro" target="_blank" rel="noopener noreferrer">
          Shivam
        </a>
        .
      </p>
      <p>Contact: support@shivam.pro</p>
    </div>
  );
}

export default About;
