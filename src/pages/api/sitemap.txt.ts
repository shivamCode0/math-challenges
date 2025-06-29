import type { NextApiRequest, NextApiResponse } from "next";
import modes from "util/modes";
import categories from "util/categories";

type Data = string;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let paths = ["/", "/about", "/levelmaker", "/amc", ...categories.map((v) => `/c/${v.id}`), ...Object.keys(modes).map((mode) => `/play/${mode}`)];
  res.status(200).json(paths.map((v) => `${process.env.SITE_URL || "https://math.shivam.pro"}${v}`).join("\n"));
};

export default handler;
