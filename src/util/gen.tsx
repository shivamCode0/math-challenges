/* eslint-disable @typescript-eslint/no-unused-vars */
import { rand, shuffle, rs, pyTriplesCalc, eqFix, isPrime, lcm, gcf, pyTriples30, pyQuadruples30, zip, divByGCF } from "./methods";
import Tex from "../components/Tex";
// import * as math from "./math";
import right_triangle from "./../img/right-triangle.svg";
import React from "react";

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

const add = (min: number, max: number): Problem => {
  let a = rand(min, max);
  let b = rand(min, max);

  let e = max - min;
  e = e / (e < 4 ? 1 : 15);
  e = Math.round(e);
  if (e === 0) e = 1;
  let c = rand(-e, e, { no0: true });
  let d = c;
  while (d === c) d = rand(-e, e, { no0: true });

  return {
    q: (
      <>
        Evaluate the following expression:
        <br />
        <div className="pdiv1">
          <Tex tex={`${a}\\\\+\\space${b}`} />
          <br />

          {/* <br /> */}
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: a + b,
    opts: shuffle([
      { text: `${a + b}`, correct: true },
      { text: `${a - b}`, correct: false },
      { text: `${a + b + c}`, correct: false },
      { text: `${a + b + d}`, correct: false },
    ]),
  };
};

const sub = (min: number, max: number): Problem => {
  let a = rand(min, max);
  let b = rand(min, max);

  let e = max - min;
  e = e / (e < 4 ? 1 : 15);
  e = Math.round(e);
  if (e === 0) e = 1;
  let c = rand(-e, e, { no0: true });
  let d = c;
  while (d === c) d = rand(-e, e, { no0: true });

  return {
    q: (
      <>
        Evaluate the following expression:
        <br />
        <div className="pdiv1">
          <Tex tex={`${a}\\\\-\\space${b}`} />
          <br />

          {/* <br /> */}
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: a - b,
    opts: shuffle([
      { text: `${a - b}`, correct: true },
      { text: `${a + b}`, correct: false },
      { text: `${a - b + c}`, correct: false },
      { text: `${a - b + d}`, correct: false },
    ]),
  };
};

const subDecimal = (decPlaces: number): Problem => {
  let p10 = 10 ** (decPlaces + 1);
  let p10m1 = 10 ** decPlaces;
  let a = rand(0, p10 - 1);
  let b = rand(0, a);

  let ans = (a - b) / p10m1;

  let ia = [
    // { text: `${(a + b) / p10m1}`, correct: false },
    { text: `${(a - b + rs() * 10 ** rand(0, decPlaces)) / p10m1}`, correct: false },
  ];
  let ia2 = { text: `${(a - b + rs() * 10 ** rand(1, decPlaces - 1)) / p10m1}`, correct: false };
  if (!ia.some((v) => v.text === ia2.text)) ia.push(ia2);

  let ia3 = { text: `${(a - b + rs() * 10 ** rand(1, decPlaces - 1)) / p10m1}`, correct: false };
  if (!ia.some((v) => v.text === ia3.text)) ia.push(ia3);

  return {
    q: (
      <>
        Evaluate.
        <div className="pdiv1">
          <Tex tex={(a / p10m1).toFixed(decPlaces)} />
          <br />
          <Tex tex={`-\\space${(b / p10m1).toFixed(decPlaces)}`} />
          <br />
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: `${ans}`,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => `${v}` !== `${ans}`)]),
  };
};

const addDecimal = (decPlaces: number): Problem => {
  let p10 = 10 ** (decPlaces + 1);
  let p10m1 = 10 ** decPlaces;
  let a = rand(0, p10 - 1);
  let b = rand(a, p10 - 1);

  let ans = (a + b) / p10m1;

  let ia = [
    // { text: `${Math.abs((a - b) / p10m1)}`, correct: false },
    { text: `${(a + b + rs() * 10 ** rand(0, decPlaces)) / p10m1}`, correct: false },
  ];
  let ia2 = { text: `${(a + b + rs() * 10 ** rand(1, decPlaces - 1)) / p10m1}`, correct: false };
  if (!ia.some((v) => v.text === ia2.text)) ia.push(ia2);

  let ia3 = { text: `${(a + b + rs() * 10 ** rand(1, decPlaces - 1)) / p10m1}`, correct: false };
  if (!ia.some((v) => v.text === ia3.text)) ia.push(ia3);

  return {
    q: (
      <>
        Evaluate.
        <div className="pdiv1">
          <Tex tex={(a / p10m1).toFixed(decPlaces)} />
          <br />
          <Tex tex={`+\\space${(b / p10m1).toFixed(decPlaces)}`} />
          <br />
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: `${ans}`,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => `${v}` !== `${ans}`)]),
  };
};

const mult = (min: number, max: number): Problem => {
  let a = rand(min, max, { no0: true });
  let b = rand(min, max, { no0: true });
  return {
    q: (
      <>
        Evaluate the following expression:
        <br />
        <div className="pdiv1">
          <Tex tex={`${a}\\\\\\times\\space${b}`} />
          <br />

          {/* <br /> */}
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: a * b,
    opts: shuffle([
      { text: `${a * b}`, correct: true },
      { text: `${(a + 1) * b}`, correct: false },
      { text: `${a + b}`, correct: false },
      { text: `${a * (b + 1)}`, correct: false },
    ]),
  };
};

const div = (min: number, max: number, maxC = max): Problem => {
  let a = rand(min, max, { no0: true });
  let b = a * rand(min, maxC, { no0: true });
  return {
    q: (
      <>
        Evaluate the following expression:
        <br />
        <div className="pdiv1">
          <Tex tex={`${b}\\\\\\div\\space${a}`} />
          <br />

          {/* <br /> */}
          <hr className="mb-2 mt-1" />
        </div>
      </>
    ),
    ans: b / a,
    opts: shuffle([
      { text: `${b / a}`, correct: true },
      { text: `${b / a - a}`, correct: false },
      { text: `${Math.round((a * b * b) / 10)}`, correct: false },
      { text: `${Math.floor(b / 2) - 1 === a ? Math.floor(b / 2) : Math.floor(b / 2) - 1}`, correct: false },
    ]),
  };
};

const graphSlope = (min: number, max: number, maxP: number): Problem => {
  let m = rand(min, max, { no0: true });

  // if (m === 1 || m === 0) return graphSlope(min, max, maxP);
  let x1 = rand(-maxP, maxP);
  let y1 = rand(-maxP, maxP);
  let a = rand(-maxP, maxP);
  let x2 = x1 + a;
  let y2 = y1 + a * m;
  if (x1 === x2) return graphSlope(min, max, maxP);

  let ia = [];
  ia.push(`${Math.random() > 0.5 ? m + 1 : m - 1}`);
  ia.push(Math.round(y2 / y1));
  ia.push(`${Math.random() > 0.6 ? Math.round((x1 / x2) * 100) : ia[1] + Math.random() > 0.5 ? 1 : -1}`);

  ia = ia.map((v) => `${v}`);

  for (let i of ia) if (`${i}`.indexOf("Infinity") !== -1) return graphSlope(min, max, maxP);

  for (let i of ia) {
    if (`${i}` === `${m}`) return graphSlope(min, max, maxP);
    let j = 0;
    for (let i2 of ia) if (`${i}` === `${i2}`) ++j;
    if (j > 1) return graphSlope(min, max, maxP);
  }
  return {
    q: `Find the slope of a line going through (${x1}, ${y1}) and (${x2}, ${y2}).`,
    ans: m,
    opts: shuffle([{ text: `${m}`, correct: true }, ...ia.map((v) => ({ text: v, correct: false }))]),
  };
};

const graphYInt = (min: number, max: number, maxP): Problem => {
  let m = rand(min, max);

  let x = rand(-maxP, maxP);
  let y = rand(-maxP, maxP);

  let b = y - m * x;

  let ia = [];
  ia.push(`${Math.round((Math.random() > 0.5 ? x : y) / m)}`);
  ia.push(`${Math.round((m * 2 * y) / x)}`);
  ia.push(`${Math.random() > 0.5 ? Math.round(-b + Math.random() > 0.5 ? 1 : -1) : Math.ceil(b * Math.random() * (2.5 - 0.4) + 0.4)}`);

  for (let i of ia) {
    if (`${i}` === `${b}`) return graphYInt(min, max, maxP);
    let j = 0;
    for (let i2 of ia) if (`${i}` === `${i2}`) ++j;
    if (j > 1) return graphYInt(min, max, maxP);
  }

  return {
    q: `Find the y-intercept of a line going through (${x}, ${y}) that has a slope of ${m}.`,
    ans: b,
    opts: shuffle([{ text: `${b}`, correct: true }, ...ia.map((v) => ({ text: v, correct: false }))]),
  };
};

const factorQuad = (diffA: boolean, min: number, max: number, aMin?: number, aMax?: number): Problem => {
  let x1 = !diffA ? 1 : rand(aMin, aMax, { no0: true });
  let x2 = !diffA ? 1 : rand(aMin, aMax, { no0: true });

  let b1 = rand(min, max, { no0: true });
  let b2 = rand(min, max, { no0: true });

  let ans = eqFix(`(${x1}x + ${b1})(${x2}x + ${b2})`);

  let expForm = eqFix(`${diffA ? x1 * x2 : ""}x^2 + ${x1 * b2 + x2 * b1}x + ${b1 * b2}`);

  // let ia = diffA
  //   ? [
  //       //
  //       `(${x1}x + ${b2})(${x2}x + ${b1})`,
  //       Math.random() > 0.5 ? `(${x1 * x2}x + ${b2})(x + ${b1})` : `(x + ${b1})(${x1 * x2}x + ${b2})`,
  //     ]
  //   : [
  //       //
  //       Math.random() > 0.5 ? `(x + 1)(x + ${b1 * b2})` : `(x + ${b1 * b2})(x + 1)`,
  //   ];

  // /* prettier-ignore */ let ia = diffA ? [[[x1, b2], [x2, b1]], [[x1 * x2, b2], [1, b1]]] : [[x1 * x2, b2], [1, b1]];
  let ia = diffA
    ? [
        [
          [x1, b2],
          [x2, b1],
        ],
        [
          [x1 * x2, b2],
          [1, b1],
        ],
      ]
    : [
        [
          [x1 * x2, b2],
          [1, b1],
        ],
      ];

  return {
    q: (
      <>
        Factor <Tex tex={expForm} />
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.map((v) => ({ text: eqFix(v.map((v2) => `(${v2[0]}x + ${v2[1]})`).join("")), correct: false }))]),
  };
};

const linEq1 = (min = -6, max = 6, uc2 = true): Problem => {
  let ans = rand(min, max, { no0: rs(0.5) === 1 });
  let c1 = rand(min, max, { no0: true });
  let b1 = rand(min, max, { no0: true });
  let b2 = rand(min, max, { no0: true });

  let eq = eqFix(`${b1}x + ${c1} = ${uc2 ? `${b2}x + ` : ""}${b1 * ans + c1 - (uc2 ? b2 * ans : 0)}`); //

  let ia = [`${ans + 1}`, `${ans - 1}`, `${ans * (b1 - b2)}`, ans !== 0 && `${Math.round(1 / ans)}`].filter((v) => !!v);
  return {
    q: (
      <>
        Solve for x: <br /> <Tex tex={eq} />
      </>
    ),
    ans: ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== `${ans}`).map((v) => ({ text: eqFix(v), correct: false }))]),
  };
};

const sysLinear = (min: number = -8, max: number = 8, minC: number = -3, maxC: number = 3): Problem => {
  let x = rand(min, max);
  let y = rand(min, max);
  let e1c1 = rand(minC, maxC, { no0: true });
  let e1c2 = rand(minC, maxC, { no0: true });
  let e2c1 = rand(minC, maxC, { no0: true });
  let e2c2 = rand(minC, maxC, { no0: true });

  if ((e1c1 === e2c1 && e1c2 === e2c2) || e1c1 / e2c1 === e1c2 / e2c2) return sysLinear(min, max, minC, maxC);

  let ans = `(${x}, ${y})`;

  let eq1 = eqFix(`${e1c1 < 0 && e1c2 > 0 ? `${e1c2}y + ${e1c1}x` : `${e1c1}x + ${e1c2}y`} = ${e1c1 * x + e1c2 * y}`);
  let eq2 = eqFix(`${e2c1 < 0 && e2c2 > 0 ? `${e2c2}y + ${e2c1}x` : `${e2c1}x + ${e2c2}y`} = ${e2c1 * x + e2c2 * y}`);

  let ia = [`(${x + 2}, ${y})`, `(${rs() * (x - y)}, ${y})`, `(${x}, ${y - 2})`, `(${y - 1}, ${x})`];
  return {
    q: (
      <>
        Solve for (x, y) using the following equations.
        <br /> <Tex tex={eq1} /> <br /> <Tex tex={eq2} />
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: v, correct: false }))]),
  };
};

const sysLinear3 = (min: number = -8, max: number = 8, minC: number = -3, maxC: number = 3): Problem => {
  let x = rand(min, max);
  let y = rand(min, max);
  let z = rand(min, max);

  /* prettier-ignore */ let coeffs = Array(3).fill(null).map(() => Array(3).fill(null).map(() => rand(minC, maxC, { no0: true })))
  let a23 = [];
  let eqs = coeffs.map(([c1, c2, c3]) => eqFix((c1 < 0 && c2 > 0 ? `${c2}y + ${c1}x + ${c3}z` : `${c1}x + ${c2}y + ${c3}z`) + ` = ${c1 * x + c2 * y + c3 * z}`));

  let ans = `(${x}, ${y}, ${z})`;
  let ia = [`(${x + 2}, ${y}, ${z})`, `(${rs() * (x - y)}, ${y}, ${z})`, `(${rs() * x}, ${y - 2}, ${rs() * z})`, `(${y - 1}, ${x}, ${rs() * z})`];
  return {
    q: (
      <>
        Solve for (x, y, z) using the following equations.
        {eqs.map((v) => (
          <React.Fragment key={v}>
            <br /> <Tex tex={v} />
          </React.Fragment>
        ))}
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: v, correct: false }))]),
  };
};

/**
 * Quadratic Equation
 */
const solve1q = (diffA: boolean, min: number, max: number, mMin?: number, mMax?: number): Problem => {
  let x1 = rand(min, max, { no0: true });
  let x2 = rand(min, max, { no0: true });

  let m1 = !diffA ? 1 : rand(mMin, mMax, { no0: true });
  let b1 = -x1 * m1;
  let m2 = !diffA ? 1 : rand(mMin, mMax, { no0: true });
  let b2 = -x2 * m2;

  let ans = (x1 === x2 ? [x1] : [x1, x2]).sort((a, b) => b - a);

  let b = m1 * b2 + m2 * b1;
  let expForm = eqFix(`${m1 * m2}x^2 + ${b}x + ${b1 * b2} = 0`);
  let ia = [
    //
    [-x1, -x2],
    x1 === x2 ? [x1 + rs()] : [x1 + rs(), x2 + rs()],
    [rs() - x1, rs() - x2],
    [Math.round(-b2 / m1), Math.round(-b1 / m2)],
  ]
    .map((v) => [...new Set(v)])
    .map((v) => v.sort((a, b) => b - a));

  return {
    q: (
      <>
        Solve for x: <br />
        <Tex tex={expForm} />
        <br />
        <small>
          <em>If there are multiple answers, seperate them with a comma.</em>
        </small>
      </>
    ),
    ans: ans.join(", "),
    opts: shuffle([{ text: `${ans.join(", ")}`, correct: true }, ...ia.filter((v) => JSON.stringify(v) !== JSON.stringify(ans)).map((v) => ({ text: v.join(", "), correct: false }))]),
  };
};

/**
 * **BROKEN**
 * Pythagorean Theorem Question Generator
 * @param rs1 if there is a chance to not solve for the hypotenuse
 * @param min minimum triple index
 * @param max maximum triple index
 * @returns Problem
 */
const pythagoreanTheorem = (rs1 = true, min = 3, max = 8, useNonPerfect = true): Problem => {
  let pyTriples100: any[][];
  let anySide = rs1 && rs() === 1;
  let unit = shuffle(["cm", "in.", "ft", "m"])[0];
  let t: any[] = pyTriples100[rand(min, max)];
  // if (useNonPerfect) anySide ? t[0] + t[2]
  let ans1 = anySide ? t[0] : t[2];
  let ans = ans1;
  if (useNonPerfect && rs() === 1) {
    if (rs()) {
      let a1 = rs();
      t[1] += a1;
      t[2] = `\\sqrt{${t[0] ** 2 + t[1] ** 2}}`;
    } else {
      t[2] += 1;
      t[0] = `\\sqrt{${t[2] ** 2 - t[1] ** 2}}`;
    }
  }
  let ia: (string | JSX.Element)[] = [ans + 2 + rs(), ans + 2 + rs()].map((v) => `${v} ${unit}`);
  ia.push(<Tex tex={`\\sqrt{${ans ** 2 + rs()}}`} />);
  return {
    q: (
      <>
        Solve for the length of the missing side <Tex tex="x" /> in the right triangle below:
        <div style={{ position: "relative", padding: "0.5rem 0.5rem 2rem 2rem" }}>
          <span style={{ position: "absolute", top: "80px", left: "0px" }}>
            <Tex tex={`${anySide ? "x" : t[0]}`} />
          </span>
          <span style={{ position: "absolute", top: "180px", left: "120px" }}>
            <Tex tex={`${t[1]}`} />
          </span>
          <span style={{ position: "absolute", top: "55px", left: "140px" }}>
            <Tex tex={`${anySide ? t[2] : "x"}`} />
          </span>

          <img style={{ width: "10em" }} src={right_triangle} alt={`Sides: ${t.toString()}`} />
        </div>
      </>
    ),
    ans: ans,
    opts: shuffle([
      {
        text: `${ans} ${unit}`,
        correct: true,
      },
      ...ia.filter((v) => v !== `${ans}`).map((v) => ({ text: v, correct: false })),
    ]),
  };
};

/**
 * Solve quadratics by completing the square
 * @param rDist How far x-ints are from `h`
 */
const completeTheSquare = (min: number, max: number, rDist: number): Problem | any => {
  let h = rand(min, max, { no0: true });
  let k = rand(min, max, { no0: true });
  let dx = rand(1, max);
  let [x1, x2] = [h + dx, h - dx];

  let expForm = eqFix(`a(x - h)^2 + k = 0`);
  //h ± sqrt(-k/a)
};

/**
 * GCF or LCM
 */
const lcmProblem = (min: number, max: number, maxAns: number): Problem => {
  let a = rand(min, max, { no0: true });
  let b = rand(min, max, { no0: true });
  let ans = lcm(a, b);
  if (ans > maxAns) return lcmProblem(min, max, maxAns);

  let ia = [a * b, (2 + rs()) * ans, Math.round(ans / (0.5 * (1 + rs()) + 2))];

  return {
    q: (
      <>
        Find the least common multiple (LCM) of {a} and {b}.
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: `${v}`, correct: false }))]),
  };
};

const gcfProblem = (min: number, max: number): Problem => {
  let a = rand(min, max, { no0: true });
  let b = rand(min, max, { no0: true });
  if (a === b || [a, b].some((v) => isPrime(v))) return gcfProblem(min, max);

  let ans = gcf(a, b);
  let ia = [Math.min(a, b), Math.round(ans / 2), ans * 2];

  return {
    q: (
      <>
        Find the greatest common factor (GCF) of {a} and {b}.
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: `${v}`, correct: false }))]),
  };
};

/**
 * Find the distance
 * @param minI min array index of `pyTriples30`
 * @param maxI max array index of `pyTriples30`
 */
const distanceProblem = (min: number, max: number, minI: number, maxI: number): Problem => {
  let a = [rand(min, max), rand(min, max)];
  let d = pyTriples30[rand(minI, maxI)];

  let [d1, d2] = d;
  [d1, d2] = shuffle([d1, d2]);
  let b = [a[0] + d1 * rs(), a[1] + d2 * rs()];
  let ans = d[2];

  let ia = [];

  return {
    q: (
      <>
        Find the distance between the points ({a.join(", ")}) and ({b.join(", ")}).
        <br />
        <br />
        <small>
          <em>Answer as a whole number.</em>
        </small>
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: `${v}`, correct: false }))]),
    type: ProblemType.Text,
  };
};

/**
 * Find the distance 3D
 * @param minI min array index of `pyQuadruples30`
 * @param maxI max array index of `pyQuadruples30`
 */
const distanceProblem3 = (min: number, max: number, minI: number, maxI: number): Problem => {
  let a = [rand(min, max), rand(min, max), rand(min, max)];
  let d = pyQuadruples30[rand(minI, maxI)];

  let [d1, d2, d3] = d;
  [d1, d2, d3] = shuffle([d1, d2, d3]);
  let b = [a[0] + d1 * rs(), a[1] + d2 * rs(), a[2] + d3 * rs()];
  let ans = d[3];

  let ia = [];

  return {
    q: (
      <>
        Find the distance between the points ({a.join(", ")}) and ({b.join(", ")}).
        <br />
        <br />
        <small>
          <em>Answer as a whole number.</em>
        </small>
      </>
    ),
    ans,
    opts: shuffle([{ text: `${ans}`, correct: true }, ...ia.filter((v) => v !== ans).map((v) => ({ text: `${v}`, correct: false }))]),
    type: ProblemType.Text,
  };
};

/**
 * Fraction Addition Problem
 * @param min min number (n or d)
 * @param max max
 * @param amt num of fractions
 */
const fractionAddProblem = (min: number, max: number, amt = 2, minLCD: number, maxLCD: number): Problem => {
  let n = Array(amt)
    .fill(null)
    .map((v) => rand(min, max - 1, { no0: true }));
  let d = Array(amt)
    .fill(null)
    .map((v) => rand(min, max, { no0: true }));

  let fracs = zip(n, d);

  let lcmD = lcm(...d);

  if (lcmD > maxLCD || lcmD < minLCD) return fractionAddProblem(min, max, amt, minLCD, maxLCD);

  // let ans = [fracs.map((v) => (v[0] * lcmD) / v[1]).reduce((a, c) => a + c, 0), lcmD];
  let ans = [fracs.map((v) => (v[0] * lcmD) / v[1]).reduce((a, c) => a + c, 0), lcmD].map((v, i, a) => v / gcf(...a));

  return {
    q: (
      <>
        Evaluate:
        <br />
        <div style={{ fontSize: "2em" }}>
          <Tex tex={fracs.map((v) => `\\frac{${v[0]}}{${v[1]}}`).join(" + ")} />
        </div>
        <div className="mt-3">
          <em>Answer as a simplified fraction.</em>
        </div>
      </>
    ),
    ans: ans.join("/"),
    opts: shuffle([{ text: ans.join("/"), correct: true }]),
    type: ProblemType.Text,
  };
};

/**
 * Fraction Addition Problem
 * @param min min number (n or d)
 * @param max max
 * @param amt num of fractions
 */
const fractionSubProblem = (min: number, max: number, amt = 2, minLCD: number, maxLCD: number): Problem => {
  let n = Array(amt)
    .fill(null)
    .map((v) => rand(min, max - 1, { no0: true }));
  let d = Array(amt)
    .fill(null)
    .map((v) => rand(min, max, { no0: true }));

  let fracs = zip(n, d);

  let lcmD = lcm(...d);

  if (lcmD > maxLCD || lcmD < minLCD) return fractionAddProblem(min, max, amt, minLCD, maxLCD);

  // let ans = [fracs.map((v) => (v[0] * lcmD) / v[1]).reduce((a, c) => a + c, 0), lcmD];
  let ans = [fracs.map((v, i) => ((i === 0 ? -1 : 1) * v[0] * lcmD) / v[1]).reduce((a, c) => a - c, 0), lcmD].map((v, i, a) => v / gcf(...a));

  return {
    q: (
      <>
        Evaluate:
        <br />
        <div style={{ fontSize: "2em" }}>
          <Tex tex={fracs.map((v) => `\\frac{${v[0]}}{${v[1]}}`).join(" - ")} />
        </div>
        <div className="mt-3">
          <em>Answer as a simplified fraction.</em>
        </div>
      </>
    ),
    ans: ans.join("/"),
    opts: shuffle([{ text: ans.join("/"), correct: true }]),
    type: ProblemType.Text,
  };
};

/**
 * Fraction Multiplication Problem
 * @param min min number (n or d)
 * @param max max
 * @param amt num of fractions
 */
const fractionMultProblem = (min: number, max: number, amt = 2, minLCD: number, maxLCD: number): Problem => {
  let n = Array(amt)
    .fill(null)
    .map((v) => rand(min, max - 1, { no0: true }));
  let d = Array(amt)
    .fill(null)
    .map((v) => rand(min, max, { no0: true }));

  let fracs = zip(n, d);

  let lcmD = lcm(...d);

  if (lcmD > maxLCD || lcmD < minLCD) return fractionMultProblem(min, max, amt, minLCD, maxLCD);

  let ans = divByGCF([n.reduce((a, c) => a * c, 1), d.reduce((a, c) => a * c, 1)]);

  return {
    q: (
      <>
        Evaluate:
        <br />
        <div style={{ fontSize: "2em" }}>
          <Tex tex={fracs.map((v) => `\\frac{${v[0]}}{${v[1]}}`).join(" \\times ")} />
        </div>
        <div className="mt-3">
          <em>Answer as a simplified fraction.</em>
        </div>
      </>
    ),
    ans: ans.join("/"),
    opts: shuffle([{ text: ans.join("/"), correct: true }]),
    type: ProblemType.Text,
  };
};

/**
 * Quadratic Equation
 * General form to vertex form
 */
const qToV = (min: number, max: number, minA = min, maxA = max): Problem => {
  // a(x - h)^2 + k
  let a = rand(minA, maxA, { no0: true });
  let h = rand(min, max, { no0: true });
  let k = rand(min, max, { no0: true });

  let ans = `${a}(x - ${h})^2 + ${k}`;

  let ia = [
    //
    `${a}(x - ${k})^2 + ${h}`,
    `${a}(x - ${h})^2 + ${-k}`,
    `${h}(x - ${a})^2 + ${k}`,
  ];

  return {
    q: (
      <>
        Convert this quadratic expression into vertex form (<Tex tex={`a(x - h)^2 + k`} />
        ): <br />
        <Tex tex={eqFix(`${a}x^2 + ${-2 * h * a}x + ${h ** 2 + k}`)} />
      </>
    ),
    ans,
    opts: shuffle([
      { text: <Tex tex={eqFix(`${ans}`)} />, correct: true },
      ...ia.filter((v) => JSON.stringify(v) !== JSON.stringify(ans)).map((v) => ({ text: <Tex tex={eqFix(v)} />, correct: false })),
    ]),
  };
};

const s = {
  add1: () => add(1, 9),
  add2: () => add(1, 100),
  add3: () => add(-10000, 10000),

  sub1: () => sub(0, 9),
  sub2: () => sub(10, 100),
  sub3: () => sub(100, 10000),

  mult1: () => mult(0, 12),
  mult2: () => mult(2, 25),
  mult3: () => mult(11, 99),

  div1: () => div(0, 12),
  div2: () => div(2, 25),
  div3: () => div(11, 99),

  graphslope1: () => graphSlope(1, 5, 5),
  graphslope2: () => graphSlope(-15, 15, 25),
  graphslope3: () => graphSlope(-100, 100, 80),

  graphyint1: () => graphYInt(1, 5, 5),
  graphyint2: () => graphYInt(-15, 15, 25),
  graphyint3: () => graphYInt(-100, 100, 80),

  factorquad1: () => factorQuad(false, 2, 6),
  factorquad2: () => factorQuad(true, -6, 6, 2, 3),
  factorquad3: () => factorQuad(true, -8, 12, -6, 8),

  solvequad1: () => solve1q(false, -6, 6),
  solvequad2: () => solve1q(true, -8, 8, -3, 3),
  solvequad3: () => solve1q(true, -12, 12, -6, 6),

  lineq1: () => linEq1(-6, 6, false),
  lineq2: () => linEq1(-12, 12, true),
  lineq3: () => linEq1(-24, 24, true),

  syslinear1: () => sysLinear(1, 6, -4, 4),
  syslinear2: () => sysLinear(-6, 6, -6, 6),
  syslinear3: () => sysLinear(-12, 12, -12, 12),

  syslinear3_1: () => sysLinear3(1, 6, -4, 4),
  syslinear3_2: () => sysLinear3(-6, 6, -6, 6),
  syslinear3_3: () => sysLinear3(-12, 12, -12, 12),

  pythagorean_theorem1: () => pythagoreanTheorem(false, 3, 8),
  pythagorean_theorem2: () => pythagoreanTheorem(true, 3, 12),
  pythagorean_theorem3: () => pythagoreanTheorem(true, 5, 25),

  sub_decimal1: () => subDecimal(1),
  sub_decimal2: () => subDecimal(3),
  sub_decimal3: () => subDecimal(5),

  add_decimal1: () => addDecimal(1),
  add_decimal2: () => addDecimal(3),
  add_decimal3: () => addDecimal(5),

  gcf1: () => gcfProblem(8, 20),
  gcf2: () => gcfProblem(12, 50),
  gcf3: () => gcfProblem(15, 80),

  lcm1: () => lcmProblem(3, 10, 50),
  lcm2: () => lcmProblem(6, 15, 100),
  lcm3: () => lcmProblem(10, 50, 300),

  distance1: () => distanceProblem(-10, 10, 0, 5),
  distance2: () => distanceProblem(-15, 15, 0, 15),
  distance3: () => distanceProblem(-20, 20, 0, 30),

  distance3_1: () => distanceProblem3(-10, 10, 0, 5),
  distance3_2: () => distanceProblem3(-15, 15, 0, 15),
  distance3_3: () => distanceProblem3(-20, 20, 0, 30),

  add_fraction1: () => fractionAddProblem(3, 10, 2, 2, 10),
  add_fraction2: () => fractionAddProblem(4, 12, 2, 10, 30),
  add_fraction3: () => fractionAddProblem(4, 10, 3, 10, 60),

  sub_fraction1: () => fractionSubProblem(3, 10, 2, 2, 10),
  sub_fraction2: () => fractionSubProblem(4, 12, 2, 10, 30),
  sub_fraction3: () => fractionSubProblem(4, 10, 3, 10, 60),

  mult_fraction1: () => fractionMultProblem(3, 10, 2, 2, 10),
  mult_fraction2: () => fractionMultProblem(4, 12, 2, 10, 30),
  mult_fraction3: () => fractionMultProblem(4, 10, 3, 10, 60),

  vertex_form1: () => qToV(-2, 4, 1, 2),
  vertex_form2: () => qToV(-6, 6, -3, 3),
  vertex_form3: () => qToV(-8, 10, -6, 6),

  test: () => qToV(-6, 6, 3),
};

export default s;
export type { Problem };
export { ProblemType };

/*
  subtracting fractions
  isPrime
  Complete the Square
  Match the graph to the equation
  logarithms 
*/
