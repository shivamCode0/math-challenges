import type { NextApiRequest, NextApiResponse } from "next";
import { makeBatch, randomAMC, randomProblems } from "util/amc";
import { AMCProblem } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse<AMCProblem[]>) => {
  const { n, v, q } = req.query as { [k: string]: string };
  if (!!v) return void res.json(await makeBatch([v as string]));

  let num = Number.parseInt(n as any);
  if (Number.isNaN(num)) num = 1;
  if (num > 10) num = 10;
  if (num < 0) num = 1;
  if (!!q && q.toLowerCase() === "amc") return void res.json(await randomAMC(num));
  let data = await randomProblems(num);
  res.json(data);
};

export default handler;
