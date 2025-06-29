import { GetStaticPaths } from "next";

export { default as default } from "./../[mode]";
export { getStaticProps } from "./../[mode]";

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: [],
  fallback: "blocking",
});
