declare module "*.png" {
  const src: string;
  export { src };
}
declare module "*.svg";

type Problem = {
  q: React.ReactNode;
  ans?: string | number;
  opts: {
    text: string | JSX.Element;
    correct: boolean;
  }[];
  type?: ProblemType;
  ansCustom?: (Input: ({ isCorrect, ans }: { isCorrect?: (v: number) => boolean; ans: number | string }) => JSX.Element) => React.ReactNode;
};

type AMCProblem = {
  title: string;
  difficulty: number;
  problem: string;
  solutions: string;
  answer?: string;
};
