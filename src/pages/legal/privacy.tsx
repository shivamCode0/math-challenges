/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import React from "react";

function Privacy() {
  return (
    <div className="container mt-3" style={{}}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Privacy Policy</title>
      </Head>
      <h1>Privacy Policy for Math Challenges</h1>

      <p>
        At Math Challenges, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information. By using our services, you agree to the
        terms of this policy.
      </p>

      <h2>Information We Collect</h2>
      <p>We do not collect any personal information from our users. Math Challenges does not require you to create an account or provide any personal information.</p>

      <h2>How We Use Your Information</h2>
      <p>Since we do not collect personal information, we do not use your information in any way.</p>

      <h2>Third-Party Services</h2>
      <p>
        Math Challenges may use third-party services, such as advertising networks, analytics, or social media sharing buttons. These services may collect information as governed by their respective
        privacy policies. We encourage you to review the privacy policies of these third-party services.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect your data. However, please be aware that no method of data transmission over the internet is entirely secure, and we cannot guarantee the security of
        your information.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time without notice. Please review this Privacy Policy periodically.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at support [at] shivam.pro.</p>
    </div>
  );
}

export default Privacy;
