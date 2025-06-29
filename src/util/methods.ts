// import * as math from "./math";
/**
 * Generates a random integer between `min` and `max`
 * @param options no0: Don't generate 0
 */
export const rand = (min: number, max: number, { no0 = false } = {}): number => {
  if (no0) {
    let a = 0;
    while (a === 0) a = Math.floor(Math.random() * (max - min + 1)) + min;
    return a;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// export const randFrac = (min: number, max: number, { no0 = false, frac = 4 } = {}) => math.frac(rand(min * 4, max * 4, { no0 }), frac);

/**
 * Shuffles `array` using an unbiased algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
export const rDist = (min = 0, max = 10, rep = 1e7): number[] => {
  let a = [];
  for (let i = 0; i < rep; i++) {
    let b = rand(min, max);
    a[b] = a[b] ? a[b] + 1 : 1;
  }
  console.log(a);
  console.log(a.reduce((a, c) => a + c, 0));
  return a;
};

export const rs = (cToGet1 = 0.5) => (Math.random() > cToGet1 ? -1 : 1);

export const isSquare = (n: number) => n > 0 && Math.sqrt(n) % 1 === 0;

/**
 * Calculates Pythagorean triples
 * @param maxAB maximum value for smaller 2 numbers
 */
export const pyTriplesCalc = (maxAB: number): [number, number, number][] => {
  let triples = [];
  for (let a = 1; a < maxAB; a++)
    for (let b = a; b < maxAB; b++) {
      let c = (a ** 2 + b ** 2) ** 0.5;
      if (c === Math.round(c)) triples.push([a, b, c]);
    }
  return triples;
};

export const pyQuadruplesCalc = (maxAB: number): [number, number, number, number][] => {
  let triples = [];
  for (let a = 1; a < maxAB; a++)
    for (let b = a; b < maxAB; b++)
      for (let c = b; c < maxAB; c++) {
        let d = (a ** 2 + b ** 2 + c ** 2) ** 0.5;
        if (d === Math.round(d)) triples.push([a, b, c, d]);
      }
  return triples;
};

export const isPrime = (n: number) => {
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return n > 1;
};

export const genPrimes = (amount = 100) => {
  let primes = [];
  for (let i = 2; primes.length < amount; i++) {
    let a = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        a = false;
        break;
      }
    }
    if (a) primes.push(i);
  }
  return primes;
};

/**
 * Calculates the greatest common factor
 */
export const gcf = (...arr: number[]): number => {
  // if (arr.some((v) => v < 0)) throw new RangeError("The GCF is only defined for positive integers.");
  const _gcf = (a: number, b: number): number => (b === 0 ? a : _gcf(b, a % b));
  return Math.abs([...arr].reduce((a, b) => _gcf(a, b), arr[0]));
};

/**
 * Fixes equations by removing `+-`, `--`, `1x`, etc.
 * @param equation The equation to simplify the structure
 * @returns Fixed Equation
 */
export const eqFix = (equation: string): string =>
  equation
    .replace(/\+ -/g, "- ")
    .replace(/- -/g, "+ ")
    .replace(/= \+/g, "= ")
    .replace(/\b1([a-zA-Z])/g, "$1")
    .replace(/([\s]*[+]+[\s]*)+/g, " + ")
    .replace(/\s+/g, " ");

/**
 * Calculates the least common multiple
 */
export const lcm = (...arr: number[]): number => {
  if (arr.includes(0)) throw new RangeError("The LCM of zero does not exist.");
  const _lcm = (x: number, y: number) => (x * y) / gcf(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

/**
 * Divides every number in the array by the GCF
 */
export const divByGCF = (arr: number[]): number[] => arr.map((v) => v / gcf(...arr));

/**
 * Gives 2 random factors that multiply to be `n`
 */
export const randFactors = (n: number) => {
  throw new Error("Not implemented yet.");
};

/**
 * Rounds to the specified number of decimal places
 */
export const roundDec = (n: number, decimalPlaces: number = 2): number => Math.round((n + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;

/**
 * Zips the arrays together
 */
export const zip = <T>(...arrs: T[][]): T[][] => arrs[0].map((_, i) => arrs.map((x) => x[i]));

/**
 * Sum of numbers in array
 */
export const sum = (arr: number[]) => arr.reduce((a, c) => a + c, 0);

/**
 * Product of numbers in array
 */
export const prod = (arr: number[]) => arr.reduce((a, c) => a * c, 0);

/**
 * First 30 Pythagorean Triples
 */
export const pyTriples30: [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [15, 20, 25],
  [7, 24, 25],
  [10, 24, 26],
  [20, 21, 29],
  [18, 24, 30],
  [16, 30, 34],
  [21, 28, 35],
  [12, 35, 37],
  [15, 36, 39],
  [24, 32, 40],
  [9, 40, 41],
  [27, 36, 45],
  [30, 40, 50],
  [14, 48, 50],
  [24, 45, 51],
  [20, 48, 52],
  [28, 45, 53],
  [33, 44, 55],
  [40, 42, 58],
  [36, 48, 60],
  [39, 52, 65],
  [33, 56, 65],
  [42, 56, 70],
  [48, 55, 73],
];

/**
 * First 30 Pythagorean Quadruples
 */
export const pyQuadruples30: [number, number, number, number][] = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [4, 4, 7, 9],
  [1, 4, 8, 9],
  [6, 6, 7, 11],
  [2, 6, 9, 11],
  [3, 4, 12, 13],
  [2, 10, 11, 15],
  [2, 5, 14, 15],
  [8, 9, 12, 17],
  [1, 12, 12, 17],
  [6, 10, 15, 19],
  [6, 6, 17, 19],
  [1, 6, 18, 19],
  [8, 11, 16, 21],
  [4, 13, 16, 21],
  [4, 8, 19, 21],
  [4, 5, 20, 21],
  [6, 13, 18, 23],
  [3, 14, 18, 23],
  [3, 6, 22, 23],
  [12, 15, 16, 25],
  [9, 12, 20, 25],
  [7, 14, 22, 27],
  [10, 10, 23, 27],
  [2, 14, 23, 27],
  [2, 10, 25, 27],
  [2, 7, 26, 27],
  [12, 16, 21, 29],
  [11, 12, 24, 29],
];

// pyQuadruples30.sort((a, b) => {
//   let i3 = a[3] - b[3];
//   if (i3 !== 0) return i3;

//   let i2 = a[2] - b[2];
//   if (i2 !== 0) return i2;

//   let i1 = a[1] - b[1];
//   if (i1 !== 0) return i1;

//   let i0 = a[0] - b[0];
//   if (i0 !== 0) return i0;

//   return 0;
// });
