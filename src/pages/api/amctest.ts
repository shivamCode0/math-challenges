import type { NextApiRequest, NextApiResponse } from "next";
import { randomProblems } from "util/amc";
import { AMCProblem } from "types";
import { doAll } from "util/amc";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "production") {
    let a = await doAll((v) => v.includes("AMC "));
    res.json(a);
  } else {
    res.send("Not allowed");
  }
};

export default handler;
