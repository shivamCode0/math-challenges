import gen from "./gen";

const modesRaw = <(Omit<Mode, "gen" | "amount"> & { amount?: number; id: string })[]>[
  {
    name: "Adding one-digit numbers",
    id: "add1",
    time: 30,
    amount: 20,
    meta: {
      topic: "Addition",
      skills: "addition, simple arithmetic",
      age: 4,
      questions: [
        {
          text: "Evaluate: $$8 + 7$$",
          answers: [
            { text: "1", correct: false },
            { text: "15", correct: true },
            { text: "16", correct: false },
            { text: "13", correct: false },
          ],
          comment: "Check your answer.",
        },
        {
          text: "Evaluate: $$4 + 2$$",
          answers: [
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "2", correct: false },
            { text: "8", correct: false },
          ],
          comment: "Verify your work.",
        },
      ],
    },
  },
  {
    name: "Adding numbers 1 - 100",
    id: "add2",
    time: 60,
    amount: 12,
    meta: {
      topic: "Addition",
      skills: "addition, simple arithmetic",
      age: 6,
      questions: [
        {
          text: "Evaluate: $$27 + 44$$",
          answers: [
            { text: "31", correct: false },
            { text: "89", correct: false },
            { text: "71", correct: true },
            { text: "73", correct: false },
          ],
          comment: "Check your answer.",
        },
        {
          text: "Evaluate: $$19 + 6$$",
          answers: [
            { text: "25", correct: true },
            { text: "23", correct: false },
            { text: "27", correct: false },
            { text: "13", correct: false },
          ],
          comment: "Verify your work.",
        },
      ],
    },
  },
  {
    name: "Adding numbers up to 10,000",
    id: "add3",
    time: 120,
    amount: 8,
  },
  {
    name: "Subtracting one-digit numbers",
    id: "sub1",
    time: 30,
    amount: 20,
  },
  {
    name: "Subtracting numbers 1 - 100",
    id: "sub2",
    time: 60,
    amount: 12,
  },
  {
    name: "Subtracting numbers up to 10,000",
    id: "sub3",
    time: 120,
    amount: 8,
  },
  {
    name: "Multiplying numbers 1 - 12",
    id: "mult1",
    time: 30,
    amount: 15,
  },
  {
    name: "Multiplying numbers 1 - 25",
    id: "mult2",
    time: 60,
    amount: 8,
  },
  {
    name: "Multiplying two-digit numbers",
    id: "mult3",
    time: 120,
    amount: 6,
  },
  {
    name: "Dividing numbers 1 - 12",
    id: "div1",
    time: 30,
    amount: 15,
  },
  {
    name: "Dividing numbers 1 - 25",
    id: "div2",
    time: 60,
    amount: 8,
  },
  {
    name: "Dividing for two-digit numbers",
    id: "div3",
    time: 120,
    amount: 6,
  },
  {
    name: "Find the slope of a line with 2 points - Level 1",
    id: "graphslope1",
    time: 30,
  },
  {
    name: "Find the slope of a line with 2 points - Level 2",
    id: "graphslope2",
    time: 60,
  },
  {
    name: "Find the slope of a line with 2 points - Level 3",
    id: "graphslope3",
    time: 120,
  },
  {
    name: "Find the y-intercept of a line with the slope and a point - Level 1",
    id: "graphyint1",
    time: 30,
  },
  {
    name: "Find the y-intercept of a line with the slope and a point - Level 2",
    id: "graphyint2",
    time: 60,
  },
  {
    name: "Find the y-intercept of a line with the slope and a point - Level 3",
    id: "graphyint3",
    time: 120,
  },
  {
    name: "Level 1 - Solve x<sup>2</sup> + bx + c",
    id: "solvequad1",
    time: 120,
    amount: 8,
  },
  {
    name: "Level 2 - Solve ax<sup>2</sup> + bx + c",
    id: "solvequad2",
    time: 180,
    amount: 8,
  },
  {
    name: "Level 3 - Solve ax<sup>2</sup> + bx + c",
    id: "solvequad3",
    time: 24,
    amount: 8,
  },
  {
    name: "Level 1 - Factoring x<sup>2</sup> + bx + c",
    id: "factorquad1",
    time: 40,
  },
  {
    name: "Level 2 - Factoring ax<sup>2</sup> + bx + c",
    id: "factorquad2",
    time: 90,
  },
  {
    name: "Level 3 - Factoring ax<sup>2</sup> + bx + c",
    id: "factorquad3",
    time: 120,
  },
  {
    name: "Level 1 - Solve an equation",
    id: "lineq1",
    time: 30,
  },
  {
    name: "Level 2 - Solve an equation",
    id: "lineq2",
    time: 60,
  },
  {
    name: "Level 3 - Solve an equation",
    id: "lineq3",
    time: 90,
  },
  {
    name: "Level 1 - Solve 2-variable systems",
    id: "syslinear1",
    time: 60,
    amount: 10,
  },
  {
    name: "Level 2 - Solve 2-variable systems",
    id: "syslinear2",
    time: 90,
    amount: 8,
  },
  {
    name: "Level 3 - Solve 2-variable systems",
    id: "syslinear3",
    time: 120,
    amount: 6,
  },
  {
    name: "Level 1 - Solve 3-variable systems",
    id: "syslinear3_1",
    time: 120,
    amount: 6,
  },
  {
    name: "Level 2 - Solve 3-variable systems",
    id: "syslinear3_2",
    time: 180,
    amount: 5,
  },
  {
    name: "Level 3 - Solve 3-variable systems",
    id: "syslinear3_3",
    time: 240,
    amount: 4,
  },
  // {
  //   name: "Level 1 - Pythagorean Theorem",
  //   id: "pythagorean_theorem1",
  //   time: 40,
  // },
  // {
  //   name: "Level 2 - Pythagorean Theorem",
  //   id: "pythagorean_theorem2",
  //   time: 60,
  // },
  // {
  //   name: "Level 3 - Pythagorean Theorem",
  //   id: "pythagorean_theorem3",
  //   time: 90,
  // },
  {
    name: "Level 1 - Subtracting Decimals",
    id: "sub_decimal1",
    time: 30,
  },
  {
    name: "Level 2 - Subtracting Decimals",
    id: "sub_decimal2",
    time: 60,
  },
  {
    name: "Level 3 - Subtracting Decimals",
    id: "sub_decimal3",
    time: 90,
  },
  {
    name: "Level 1 - Adding Decimals",
    id: "add_decimal1",
    time: 30,
  },
  {
    name: "Level 2 - Adding Decimals",
    id: "add_decimal2",
    time: 60,
  },
  {
    name: "Level 3 - Adding Decimals",
    id: "add_decimal3",
    time: 90,
  },
  {
    name: "Find the GCF of numbers 8 - 20",
    id: "gcf1",
    time: 30,
  },
  {
    name: "Find the GCF of numbers 12 - 50",
    id: "gcf2",
    time: 60,
  },
  {
    name: "Find the GCF of numbers 15 - 80",
    id: "gcf3",
    time: 90,
  },
  {
    name: "Find the LCM of numbers 3 - 10",
    id: "lcm1",
    time: 30,
  },
  {
    name: "Find the LCM of numbers 6 - 15",
    id: "lcm2",
    time: 60,
  },
  {
    name: "Find the LCM of numbers 10 - 50",
    id: "lcm3",
    time: 90,
  },
  {
    name: "Level 1 - Find the distance between 2 points",
    id: "distance1",
    time: 40,
  },
  {
    name: "Level 2 - Find the distance between 2 points",
    id: "distance2",
    time: 60,
  },
  {
    name: "Level 3 - Find the distance between 2 points",
    id: "distance3",
    time: 90,
  },
  {
    name: "Level 1 - Find the distance between 2 points (3D)",
    id: "distance3_1",
    time: 40,
  },
  {
    name: "Level 2 - Find the distance between 2 points (3D)",
    id: "distance3_2",
    time: 60,
  },
  {
    name: "Level 3 - Find the distance between 2 points (3D)",
    id: "distance3_3",
    time: 90,
  },
  {
    name: "Level 1 - Add 2 fractions together",
    id: "add_fraction1",
    time: 60,
  },
  {
    name: "Level 2 - Add 2 fractions together",
    id: "add_fraction2",
    time: 90,
  },
  {
    name: "Level 3 - Add 3 fractions together",
    id: "add_fraction3",
    time: 120,
  },
  {
    name: "Level 1 - Subtract 2 fractions together",
    id: "sub_fraction1",
    time: 60,
  },
  {
    name: "Level 2 - Subtract 2 fractions together",
    id: "sub_fraction2",
    time: 90,
  },
  {
    name: "Level 3 - Subtract 3 fractions together",
    id: "sub_fraction3",
    time: 120,
  },
  {
    name: "Level 1 - Multiply 2 fractions together",
    id: "mult_fraction1",
    time: 60,
  },
  {
    name: "Level 2 - Multiply 2 fractions together",
    id: "mult_fraction2",
    time: 90,
  },
  {
    name: "Level 3 - Multiply 3 fractions together",
    id: "mult_fraction3",
    time: 120,
  },
  {
    name: "Level 1 - General Form to Vertex Form",
    id: "vertex_form1",
    time: 80,
  },
  {
    name: "Level 2 - General Form to Vertex Form",
    id: "vertex_form2",
    time: 100,
  },
  {
    name: "Level 3 - General Form to Vertex Form",
    id: "vertex_form3",
    time: 140,
  },
  {
    name: "Multiply 2×2 Matrices",
    id: "matrix_mult1",
    time: 120,
  },
  {
    name: "Multiply 3×3 Matrices",
    id: "matrix_mult2",
    time: 240,
  },
  {
    name: "Multiply 4×4 Matrices",
    id: "matrix_mult3",
    time: 360,
  },
  {
    name: "Test",
    id: "test",
    time: 10000000000,
  },
];

for (let [k, v] of Object.entries(gen)) if (!modesRaw.some((v) => v.id === k)) modesRaw.push({ name: k, id: k, time: 1000 });

const modes: {
  [k: string]: {
    name: string;
    gen(): Problem;
    time: number;
    amount: number;
    meta?: {
      topic: string;
      skills: string;
      age?: number;
      questions: {
        text: string;
        comment?: string;
        answers: { text: string; correct: boolean }[];
      }[];
    };
  };
} = Object.fromEntries(
  modesRaw
    // [
    //   ...modesRaw,
    //   Object.entries(gen)
    //     .filter(([k]) => !modesRaw.some((v) => v.id === k))
    //     .map(([k]) => ({ name: k, id: k, time: 1000 })),
    // ] as typeof modesRaw
    .map((v, i) => [v.id, { name: v.name, gen: gen[v.id], time: v.time, amount: v.amount || 10, ...(!!v.meta && { meta: v.meta }) }])
);

export default modes;

export type Mode = typeof modes[string];
