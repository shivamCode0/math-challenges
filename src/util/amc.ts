import katex from "katex";
// import * as cheerio from "cheerio";
import problems from "./problems.json";
import { JSDOM } from "jsdom";
import jQuery from "jquery";
import { AMCProblem } from "types";
import path from "path";
import fs from "fs/promises";

// let document = ;;
let $ = jQuery(new JSDOM("<html></html>", {}).window);

// const $2 = cheerio.load("");

export { makeBatch, randomProblems as randomProblems };

export const doAll = async () => {
  console.log("Starting...");
  const a = await makeBatch(getRandom(problems, 5));
  let p = path.join(__dirname, "tmp");
  let p2 = path.join(p, `${Date.now()}.json`);
  await fs.mkdir(p, { recursive: true });
  await fs.writeFile(p2, JSON.stringify(a));
  console.log("Done!");
  return { path: p2, a };
};

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const randomProblems = (n: number) => {
  return makeBatch(getRandom(problems, n));
};

async function makeBatch(pagenames: string[]): Promise<AMCProblem[]> {
  let problems = [];
  let problemTitles = pagenames.map((e) => e.replace(/_/g, " ").replace("#", "Problems/Problem "));
  let redirList = [];
  let redirIndex = [];
  let numProblems = problemTitles.length;
  let invalidProblems = 0;

  let apiEndpoint = "https://artofproblemsolving.com/wiki/api.php";

  let paramsList = problemTitles.map((currentProblem) => `action=parse&page=${currentProblem}&format=json`);
  console.log(paramsList);
  let responseList = await Promise.all(paramsList.map((params) => fetch(`${apiEndpoint}?${params}&origin=*`)));
  console.log(responseList);
  let jsonList = await Promise.all(responseList.map((response) => response.json()));
  console.log(jsonList);

  for (let [index, currentProblem] of problemTitles.entries()) {
    let problemText = latexer(jsonList[index].parse.text["*"]);
    let problemProblem = getProblem(problemText);
    let problemSolutions = getSolutions(problemText);

    problemProblem = problemProblem
      .split("KATEX_TMPTEST")
      .map((v, i) => (i % 2 == 0 ? v : formatLatex(v)))
      .join("$$");

    problemProblem = problemProblem
      .split("KATEXD_TMPTEST")
      .map((v, i) => (i % 2 == 0 ? v : formatLatex(v)))
      .join("$%$");

    if (problemProblem && problemSolutions) {
      problems.push({
        title: currentProblem,
        difficulty: computeDifficulty(computeTest(currentProblem), computeNumber(currentProblem), computeYear(currentProblem)),
        problem: problemProblem,
        solutions: problemSolutions,
      });
    } else if (problemText.includes("Redirect to:")) {
      console.log("Redirect problem, going there instead...");

      let redirHref = $($.parseHTML(problemText)).find(".redirectText a").attr("href");
      let redirPage = redirHref.replace("/wiki/index.php/", "").replace(/_/g, " ");
      console.log(redirPage);
      redirList.push(redirPage);
      redirIndex.push(index);
    } else {
      console.log("Invalid problem, skipping...");
      invalidProblems++;
    }
  }

  if (redirList[0]) {
    paramsList = redirList.map((redirPage) => `action=parse&page=${redirPage}&format=json`);
    console.log(paramsList);
    responseList = await Promise.all(paramsList.map((params) => fetch(`${apiEndpoint}?${params}&origin=*`)));
    console.log(responseList);
    jsonList = await Promise.all(responseList.map((response) => response.json()));
    console.log(jsonList);

    for (let [index, currentProblem] of redirList.entries()) {
      let problemText = latexer(jsonList[index].parse.text["*"]);
      let problemProblem: string = getProblem(problemText);
      problemProblem = problemProblem
        .split("KATEX_TMPTEST")
        .map((v, i) => (i % 2 == 0 ? v : formatLatex(v)))
        .join("$$");

      problemProblem = problemProblem
        .split("KATEXD_TMPTEST")
        .map((v, i) => (i % 2 == 0 ? v : formatLatex(v)))
        .join("$%$");
      let problemSolutions = getSolutions(problemText);

      problems.splice(redirIndex[index], 0, {
        title: currentProblem,
        difficulty: computeDifficulty(computeTest(currentProblem), computeNumber(currentProblem), computeYear(currentProblem)),
        problem: problemProblem,
        solutions: problemSolutions,
      });
    }
  }
  return problems;
}

const latexer = (html: string) => {
  html = html.replace(/<pre>\s+?(.*?)<\/pre>/gs, "<p style='white-space: pre-line;'>$1</p>");

  let images = html.match(/<img (?:.*?) class="latex\w*?" (?:.*?)>/g);
  images = [...new Set(images)];

  if (images) {
    for (let image of images) {
      if (!image.includes("[asy]")) {
        let isDisplay = /alt="\\\[|\\begin/.test(image);
        let imageLatex = image.match(/alt="(.*?)"/)[1];
        // let renderedLatex = katex.renderToString(imageLatex, {
        //   throwOnError: false,
        //   displayMode: isDisplay,
        // });
        // html = html.replaceAll(image, `<span class="fallback-container">$&</span>` + `<katex class="katex-container">${renderedLatex}</katex>`);
        html = html.replaceAll(image, (v) => (isDisplay ? `KATEXD_TMPTEST${imageLatex}KATEXD_TMPTEST` : `KATEX_TMPTEST${imageLatex}KATEX_TMPTEST`));
        // html = html.replaceAll(image, `<span class="fallback-container">$&</span>` + `<katex class="katex-container">${renderedLatex}</katex>`);
      }
    }
  }
  return html;
};

// Splits and adds problem parts
function getProblem(htmlString) {
  let htmlParsed = $.parseHTML(htmlString);
  let after = $(htmlParsed)
    .children()
    .not(".toc")
    .not("dl:first-child")
    .first()
    .nextUntil(":header:not(:contains('Problem'))")
    .addBack()
    .not(".toc")
    .not("p:last-child > br:first-child")
    .not(":header");

  let afterHTML = $(after)
    .map(function () {
      // @ts-ignore
      return this.outerHTML;
    })
    .get()
    .join("");
  return afterHTML;
}
const formatLatex = (string) =>
  string
    .replaceAll(/&#160;/g, " ")
    .replaceAll(/&#39;/g, "'")
    .replaceAll(/&amp;/g, "&")
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/^\$|\$$|\\\[|\\\]/g, "")
    .replaceAll(/&lt;/g, "\\lt ")
    .replaceAll(/&gt;/g, "\\gt ")
    .replaceAll(/\$/g, "\\$$")
    .replaceAll(/align\*/g, "aligned")
    .replaceAll(/eqnarray\*/g, "aligned")
    .replaceAll(/{tabular}(\[\w\])*/g, "{array}")
    .replaceAll(/\\bold{/g, "\\mathbf{")
    .replaceAll(/\\congruent/g, "\\cong")
    .replaceAll(/\\overarc/g, "\\overgroup")
    .replaceAll(/\\overparen/g, "\\overgroup")
    .replaceAll(/\\underarc/g, "\\undergroup")
    .replaceAll(/\\underparen/g, "\\undergroup")
    .replaceAll(/\\mathdollar/g, "\\$")
    .replaceAll(/\\textdollar/g, "\\$");

function getSolutions(htmlString) {
  let htmlParsed = $.parseHTML(htmlString);
  let after = $(htmlParsed)
    .children()
    .filter(":header:contains('Solution'),:header:contains('Diagram')")
    .nextUntil(":header:contains('See'), table")
    .addBack(":header:contains(' Solution'), :header:contains('Solution '), :header:contains('Solution '), :header:contains('Diagram')")
    .not("p:contains('The problems on this page are copyrighted by the')");

  let afterHTML = $(after)
    .map(function () {
      // @ts-ignore
      return this.outerHTML;
    })
    .get()
    .join("");
  return afterHTML;
}

function computeDifficulty(test, num, year) {
  let diff;
  switch (test) {
    case "AMC 8":
      diff = num < 4 ? 0.25 : num < 7 ? 0.5 : num < 10 ? 0.75 : num < 13 ? 1 : num < 17 ? 1.25 : num < 21 ? 1.5 : num < 24 ? 1.75 : 2;
      break;
    case "AMC 10":
      diff = num < 4 ? 1 : num < 7 ? 1.5 : num < 10 ? 1.75 : num < 13 ? 2 : num < 15 ? 2.25 : num < 17 ? 2.5 : num < 19 ? 2.75 : num < 21 ? 3 : num < 23 ? 3.5 : num < 25 ? 4 : 4.5;
      break;
    case "AMC 12":
      diff = num < 4 ? 1.25 : num < 6 ? 1.5 : num < 9 ? 1.75 : num < 11 ? 2 : num < 14 ? 2.5 : num < 17 ? 3 : num < 19 ? 3.25 : num < 21 ? 3.5 : num < 23 ? 4 : num < 24 ? 4.5 : num < 25 ? 5 : 5.5;
      break;
    case "AHSME":
      diff =
        num < 4
          ? 1
          : num < 7
          ? 1.5
          : num < 10
          ? 1.75
          : num < 13
          ? 2
          : num < 15
          ? 2.25
          : num < 17
          ? 2.5
          : num < 19
          ? 2.75
          : num < 21
          ? 3
          : num < 23
          ? 3.5
          : num < 25
          ? 4
          : num < 27
          ? 4.5
          : num < 29
          ? 5
          : 5.5;
      break;
    case "AIME":
      diff = num < 3 ? 3 : num < 6 ? 3.5 : num < 8 ? 4 : num < 10 ? 4.5 : num < 11 ? 5 : num < 13 ? 5.5 : num < 14 ? 6 : 6.5;
      break;
    case "USAJMO":
      diff = num == 1 || num == 4 ? 5.5 : num == 2 || num == 5 ? 6 : 7;
      break;
    case "USAMO":
      diff = num == 1 || num == 4 ? 6.5 : num == 2 || num == 5 ? 7.5 : 8.5;
      break;
    case "IMO":
      diff = num == 1 || num == 4 ? 6.5 : num == 2 || num == 5 ? 7.5 : 9.5;
      break;
    case "Alabama ARML TST":
      diff = num < 4 ? 3 : num < 7 ? 3.5 : num < 10 ? 4 : num < 13 ? 4.5 : 5;
      break;
    case "APMO":
      diff = num == 1 ? 6 : num == 2 ? 6.5 : num == 3 ? 7 : num == 4 ? 7.5 : 8.5;
      break;
    case "BMO":
      diff = num == 1 ? 6 : num == 2 ? 6.5 : num == 3 ? 7.5 : 8;
      break;
    case "Canadian MO":
      diff = num == 1 ? 5.5 : num == 2 ? 6 : num == 3 ? 6.5 : num == 4 ? 7 : 7.5;
      break;
    case "Indonesia MO":
      diff = num == 1 || num == 5 ? 3.5 : num == 2 || num == 6 ? 4.5 : num == 3 || num == 7 ? 5 : 6;
      break;
    case "iTest":
      switch (year) {
        case "2006":
        case "2007":
          diff = num < 5 ? 1 : num < 9 ? 1.5 : num < 13 ? 2 : num < 17 ? 2.5 : num < 21 ? 3 : num < 25 ? 3.5 : num < 29 ? 4 : num < 33 ? 4.5 : num < 37 ? 5 : 5.5;
          break;
        case "2008":
          diff = num < 11 ? 1 : num < 21 ? 1.5 : num < 31 ? 2 : num < 41 ? 2.5 : num < 51 ? 3 : num < 61 ? 3.5 : num < 71 ? 4 : num < 81 ? 4.5 : num < 91 ? 5 : 5.5;
          break;
      }
      break;
    case "JBMO":
      diff = num == 1 ? 4 : num == 2 ? 4.5 : num == 3 ? 5 : 6;
      break;
    case "Putnam":
      diff = num == 1 ? 7 : num == 2 ? 7.5 : num == 3 ? 8 : num == 4 ? 8.5 : 9;
      break;
    case "UMO":
      diff = num == 1 ? 3 : num == 2 ? 3.5 : num == 3 ? 4 : num == 4 ? 5 : num == 5 ? 6 : 6.5;
      break;
    case "UNCO Math Contest II":
      diff = num < 2 ? 1 : num < 3 ? 1.5 : num < 4 ? 2 : num < 5 ? 2.5 : num < 6 ? 3 : num < 7 ? 3.5 : num < 8 ? 4 : num < 9 ? 4.5 : num < 10 ? 5 : 5.5;
      break;
    case "UNM-PNM Statewide High School Mathematics Contest II":
      diff = num < 3 ? 2 : num < 4 ? 2.5 : num < 5 ? 3 : num < 6 ? 3.5 : num < 8 ? 4 : num < 9 ? 4.5 : num < 10 ? 5 : 5.5;
      break;
    default:
      diff = -1;
      break;
  }
  return diff;
}
const computeTest = (problem) =>
  problem
    .match(/(\d{4} )(.*)( Problems)/)[2]
    .replace(/AMC ((?:10)|(?:12))[AB]/, "AMC $1")
    .replace(/AIME I+/, "AIME")
    .replace(/AJHSME/, "AMC 8");
const computeYear = (problem) => problem.match(/^\d{4}/)[0];
const computeNumber = (problem) => problem.match(/\d+$/)[0];
