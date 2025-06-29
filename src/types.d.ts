declare module "*.png" {
  const src: string;
  export { src };
}
declare module "*.svg";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

enum ProblemType {
  MC = "MultipleChoice",
  Text = "Text",
}

type Problem = {
  q: JSX.Element | string;
  ans?: string | number;
  opts: {
    text: string | JSX.Element;
    correct: boolean;
  }[];
  type?: ProblemType;
};
