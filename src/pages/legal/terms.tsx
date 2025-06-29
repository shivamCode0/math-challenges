/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React from "react";

function Terms() {
  return (
    <div className="container mt-3" style={{ fontSize: "11pt" }}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Terms of Service</title>
      </Head>
      <h1>Terms of Service</h1>
      <p>By using this website or application, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using this service.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using this service, you acknowledge that you have read, understood, and agree to be bound by these terms and any additional terms incorporated by reference.</p>

      <h2>2. User Responsibilities</h2>
      <p>
        You agree to use this service for lawful purposes and in a manner that does not infringe upon the rights of others or inhibit their use of the service. You are responsible for your use of the
        service and any content you submit.
      </p>

      <h2>3. Privacy Policy</h2>
      <p>
        Your use of this service is also governed by our <a href="/privacy-policy">Privacy Policy</a>. Please review this policy to understand our practices concerning your personal information.
      </p>

      <h2>4. Modifications</h2>
      <p>We reserve the right to modify or revise these terms at any time. Your continued use of the service after any changes indicates your acceptance of the revised terms.</p>

      <h2>5. Termination</h2>
      <p>We may terminate or suspend your access to the service at our discretion, without notice, for violations of these terms or for any other reason.</p>

      <h2>6. Contact Information</h2>
      <p>If you have any questions or concerns about these terms, please contact us at [Contact Email or Address].</p>
    </div>
  );
}

export default Terms;
