import problems1 from "./problems.json";
import { JSDOM } from "jsdom";
import jQuery from "jquery";
import { AMCProblem } from "types";
import path from "path";
import fs from "fs/promises";
import chunk from "lodash/chunk";
import { formatLatex } from "./amc-helper";

const problems = problems1.map((v) => v.trim());

let $: any = jQuery(new JSDOM("<html></html>", {}).window);

export { makeBatch, randomProblems, randomAMC };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const doAll = async (filter: (v: string) => boolean) => {
  let ts = Date.now();
  console.log("Starting...");
  let chunks = chunk(problems.filter(filter), 100);
  console.log(problems.filter(filter).length, problems.length);
  return;
  for (let i = 1; i < chunks.length + 1; i++) {
    const v = chunks[i - 1];
    console.log(`Making batch ${i}/${chunks.length}...`);
    let v2 = await makeBatch(v);
    console.log(`Saving batch ${i}/${chunks.length}...`);
    let dirpath = path.join(__dirname, `../../../../data`, `${ts}`);
    await fs.mkdir(dirpath, { recursive: true });
    await fs.writeFile(path.join(dirpath, `batch${i}.json`), JSON.stringify(v2)).then(() => {
      console.log(`Batch ${i} saved!`);
    });
    await wait(1000);
  }
  console.log("Done!");
  return {};
  // const a = await makeBatch(problems.filter(filter));
  // let p = path.join(__dirname, "tmp");
  // let p2 = path.join(p, `${Date.now()}.json`);
  // await fs.mkdir(p, { recursive: true });
  // await fs.writeFile(p2, JSON.stringify(a, null, 2));
  // console.log("Done!");
  // return { path: p2, a };
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

const randomAMC = (n: number) => {
  return makeBatch(
    getRandom(
      problems.filter((v) => v.includes("AMC ")),
      n
    )
  );
};

async function makeBatch(pagenames: string[]): Promise<AMCProblem[]> {
  // cached fetch
  let cache = {};
  let fetchcount = 0;
  let fetchCached = async (url: string) => {
    if (cache[url]) return await cache[url];
    console.log(`${fetchcount} Fetching`, url);
    fetchcount++;
    let r = fetch(url).then((v) => v.json());
    cache[url] = r;
    return await r;
  };

  // console.log(pagenames);
  let problems = [];
  let problemTitles = pagenames.map((e) => e.replace(/_/g, " ").replace("#", "Problems/Problem "));
  let redirList = [];
  let redirIndex = [];
  let numProblems = problemTitles.length;
  let invalidProblems = 0;

  let apiEndpoint = "https://artofproblemsolving.com/wiki/api.php";

  let paramsList = problemTitles.map((currentProblem) => `action=parse&page=${currentProblem}&format=json`);
  let jsonList = await Promise.all(paramsList.map((params) => fetch(`${apiEndpoint}?${params}&origin=*`).then((r) => r.json())));
  // let jsonList = await Promise.all(responseList.map((response) => response.json()));
  let ansList = await Promise.all(problemTitles.map((v) => getAns(v)));

  async function getAns(pagename: string) {
    let answersTitle = `${pagename?.split(" Problems/Problem")[0]} Answer Key`.replaceAll(/\s+/g, " ");
    let apiEndpoint = "https://artofproblemsolving.com/wiki/api.php";
    let params = `action=parse&page=${answersTitle}&format=json`;

    let json = await fetchCached(`${apiEndpoint}?${params}&origin=*`);
    // let json = await response.json();
    let answerText = json.parse?.text["*"];
    let problemNum = computeNumber(pagename);
    let answer = $($.parseHTML(answerText))
      ?.find("ol li")
      ?.eq(problemNum - 1)
      ?.text();
    if (!answer) console.log("No answer found for", pagename);
    return answer;
  }

  function iter(index: number, currentProblem: string, isRedir: boolean) {
    let problemText = jsonList[index].parse.text["*"];
    let ansText = ansList[index];
    let problemProblem1: string = latexer(getProblem(problemText));
    let finalProblem = problemProblem1.replaceAll("KATEX_TMPTEST", () => "$$").replaceAll("KATEXD_TMPTEST", () => "$%$");
    let problemSolutions1 = latexer(getSolutions(problemText));
    let finalSolutions = problemSolutions1.replaceAll("KATEX_TMPTEST", () => "$$").replaceAll("KATEXD_TMPTEST", () => "$%$");

    // let dom2 = new JSDOM(problemText);
    // let { document } = dom2.window;
    // let temp_ptext = document.body.textContent;
    // console.log(problemText);
    // console.log(temp_ptext);

    if (isRedir || (problemProblem1 && problemSolutions1)) {
      problems.push({
        title: currentProblem,
        difficulty: computeDifficulty(computeTest(currentProblem), computeNumber(currentProblem), computeYear(currentProblem)),
        problem: finalProblem,
        answer: ansText,
        solutions: finalSolutions,
      });
    } else if (problemText.includes("Redirect to")) {
      console.log("Redirect problem, going there instead...");

      let redirHref = $($.parseHTML(problemText)).find(".redirectText a").attr("href");
      let redirPage = redirHref.replace("/wiki/index.php/", "").replace(/_/g, " ");
      console.log(redirPage);
      redirList.push(redirPage);
      redirIndex.push(index);
    } else {
      console.log("Invalid problem, skipping...");
      // console.log(problemText);
      invalidProblems++;
    }
  }

  for (let [index, currentProblem] of problemTitles.entries()) iter(index, currentProblem, false);

  if (redirList[0]) {
    console.log("REDIRLIST", redirList);
    paramsList = redirList.map((redirPage) => `action=parse&page=${redirPage}&format=json`);
    // console.log(paramsList);
    jsonList = await Promise.all(paramsList.map((params) => fetch(`${apiEndpoint}?${params}&origin=*`)));
    // console.log(responseList);
    jsonList = await Promise.all(jsonList.map((response) => response.json()));
    // console.log(jsonList);
    for (let [index, currentProblem] of redirList.entries()) iter(index, currentProblem, true);
  }
  return problems;
}

const latexer = (html: string) => {
  let dom = new JSDOM(html);
  let { document } = dom.window;

  document.querySelectorAll("pre").forEach((v) => {
    v.outerHTML = `<p style='white-space: pre-line;'>${v.innerHTML.trim()}</p>`;
  });
  document.querySelectorAll("a").forEach((v) => {
    let e = document.createElement("a");
    let url = new URL(v.href, "https://artofproblemsolving.com");
    e.href = url.toString();
    e.innerHTML = v.innerHTML;
    v.replaceWith(e);
  });

  document.querySelectorAll("span").forEach((v) => {
    // let e = document.createElement("span");
    v.removeAttribute("class");
    v.removeAttribute("id");
  });

  let images = [...document.querySelectorAll("img")].filter((v) => v.className.includes("latex"));

  if (images) {
    for (let image of images) {
      if (image.alt.includes("[asy]")) {
        let newImg = document.createElement("img");
        newImg.src = image.src;
        newImg.className = image.className;
        image.replaceWith(newImg);
      } else {
        let imageLatex = image.alt;
        if (html.includes("Determine when equality occurs for this value") && image.outerHTML.includes("\\sum_{1\\leq i<j \\leq n} x_ix_j (x_i^")) {
          console.log(image.outerHTML);
          console.log(imageLatex);
        }

        let isDisplay = image.classList.contains("latexdisplay") || image.classList.contains("latexcenter");
        // if (isDisplay) console.log("display", imageLatex);
        let vstr = isDisplay ? "KATEXD_TMPTEST" : "KATEX_TMPTEST";
        // image.outerHTML = `${vstr}${formatLatex(imageLatex)}${vstr}`;
        image.replaceWith(`${vstr}${formatLatex(imageLatex)}${vstr}`);
        if (html.includes("Determine when equality occurs for this value") && isDisplay) {
          console.log();
          console.log(document.body.innerHTML);
        }
      }
    }
  }
  return document.body.innerHTML;
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

  let dom = new JSDOM(afterHTML);
  let { document } = dom.window;
  document.querySelectorAll("span").forEach((v) => {
    if (v.textContent === "[edit]") v.remove();
  });
  document.querySelectorAll("h2").forEach((v) => {
    if (v.textContent.includes("Solution")) {
      let e = document.createElement("h3");
      e.innerHTML = v.textContent;
      e.classList.add("solution-header");
      v.replaceWith(e);
    } else {
      let e = document.createElement("h4");
      e.innerHTML = v.textContent;
      v.replaceWith(e);
    }
  });

  return document.body.innerHTML;
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
    .replace(/AMC ((?:10)|(?:12))[AB]?/, "AMC $1")
    .replace(/AIME I+/, "AIME")
    .replace(/AJHSME/, "AMC 8");
const computeYear = (problem) => problem.trim().match(/^\d{4}/)[0];
const computeNumber = (problem) => problem.trim().match(/\d+$/)[0];
