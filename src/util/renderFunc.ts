import GetDesmos from "./desmos";

export const renderFunc: (func: string, smallImg: boolean) => Promise<string> = (func: string, smallImg = false) =>
  new Promise(async (resolve, reject) => {
    let Desmos = await GetDesmos();
    let d = Desmos.GraphingCalculator(undefined, {
      showGrid: false,
      projectorMode: smallImg,
      xAxisNumbers: !smallImg,
      yAxisNumbers: !smallImg,
    });
    d.setExpression({
      id: "func",
      latex: func,
      lineWidth: smallImg ? 12 : 2.5,
    });
    d.asyncScreenshot({ format: "svg" }, (uri) => {
      resolve(uri);
      // @ts-ignore
      // delete d;
    });
  });
