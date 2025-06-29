export enum ProblemType {
  MC = "MultipleChoice",
  Text = "Text",
  Custom = "Custom",
}

export type Problem = {
  q: React.ReactNode;
  ans?: string | number;
  opts: {
    text: string | JSX.Element;
    correct: boolean;
  }[];
  type?: ProblemType;
  ansCustom?: (Input: ({ isCorrect, ans }: { isCorrect?: (v: number) => boolean; ans: number | string }) => JSX.Element) => React.ReactNode;
};
