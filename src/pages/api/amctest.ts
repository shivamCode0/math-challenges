import type { NextApiRequest, NextApiResponse } from "next";
import { randomProblems } from "util/amc";
import { AMCProblem } from "types";
import { doAll } from "util/amc";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let a = await doAll();
  res.send(a.path);
};

export default handler;
