/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#249e47" />
          <meta name="description" content="Math Challenges allows you to test yourself or anyone with fun and educational math questions!" />
          {/* <link rel="stylesheet" href="https://cdn.shivam.pro/app-libs/fontawesome-pro-6.0.0-alpha3-web/css/all.min.css" /> */}

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;600&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          {/* favicon package */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=PYAlRGqNaP" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=PYAlRGqNaP" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=PYAlRGqNaP" />
          <link rel="manifest" href="/site.webmanifest?v=PYAlRGqNaP" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg?v=PYAlRGqNaP" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico?v=PYAlRGqNaP" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/**/}

          {/* Open Graph */}
          <meta property="og:url" content="https://math.shivam.pro" />
          <meta property="og:title" content="Math Challenges" />
          <meta property="og:description" content="Improve and Test Your Math Skills" />
          <meta property="og:image" content="https://math.shivam.pro/imgcard.png" />
          <meta property="og:image:type" content="image/png" />
        </Head>
        <body>
          <Main />
          <div id="print-page-root"></div>
          <NextScript />
          {/* Cloudflare Web Analytics */}
          {process.env.NODE_ENV === "production" && <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "df90a14d01724e959f51616dcfd541f4"}'></script>}
          {/* End Cloudflare Web Analytics */}
        </body>
      </Html>
    );
  }
}
