import GetDesmos from "./desmos";
import { shuffle } from "./methods";

export const renderFunc: (func: string, smallImg: boolean) => Promise<string> = (func: string, smallImg = false) =>
  new Promise(async (resolve, reject) => {
    let Desmos = await GetDesmos();
    let d = Desmos.GraphingCalculator(undefined, {
      showGrid: !smallImg,
      projectorMode: true,
      xAxisNumbers: !smallImg,
      yAxisNumbers: !smallImg,
      ...(smallImg ? {} : { fontSize: 200, yAxisMinorSubdivisions: 1, xAxisMinorSubdivisions: 1, xAxisStep: 1, yAxisStep: 1 }),
    });
    d.setExpression({
      id: "func",
      latex: func,
      lineWidth: smallImg ? 12 : 2.5,
      color: shuffle(Object.values(Desmos.Colors))[0],
    });
    d.asyncScreenshot(
      {
        format: "svg",
        ...(smallImg ? {} : { height: 360 * 1.2, width: 640 * 1.2 }),
      },
      (uri) => {
        resolve(uri);
        // @ts-ignore
        // delete d;
      }
    );
  });

export const evalLatex: (latex: string, smallImg: boolean) => Promise<number> = (latex: string) =>
  new Promise(async (resolve, reject) => {
    let Desmos = await GetDesmos();
    let d = Desmos.GraphingCalculator(undefined);
    d.setExpression({ id: "a", latex });
    d.observe("expressionAnalysis", function () {
      let analysis = d.expressionAnalysis.a;
      console.log(analysis);
      // if (analysis.isGraphable) console.log("This expression can be plotted.");
      if (analysis.isError) {
        reject(analysis.errorMessage);
        console.log(`Expression: ${analysis.errorMessage}`);
      }
      if (analysis.evaluation) {
        console.log(`value: ${analysis.evaluation.value}`);
        resolve(analysis.evaluation.value as number);
      } else resolve(NaN);
    });
  });

if (typeof window !== "undefined") window["evalLatex"] = evalLatex;
