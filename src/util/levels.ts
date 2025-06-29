/* eslint-disablse import/no-anonymous-default-export */
const levels: { [k: string]: { name: string; modes: { name: string; mode: string }[][] }[] } = {
  "basic-operations": [
    {
      name: "Addition",
      modes: [
        [
          { name: "🌱 Adding single-digit numbers", mode: "add1" },
          { name: "🪴 Adding numbers 1 - 100", mode: "add2" },
          { name: "🌿 Adding numbers up to 10,000", mode: "add3" },
        ],
        [
          { name: "☘️ Level 1 - Adding Decimals", mode: "add_decimal1" },
          { name: "🌷 Level 2 - Adding Decimals", mode: "add_decimal2" },
          { name: "🌿 Level 3 - Adding Decimals", mode: "add_decimal3" },
        ],
      ],
    },
    {
      name: "Subtraction",
      modes: [
        [
          { name: "☘️ Subtracting single-digit numbers", mode: "sub1" },
          { name: "🍀 Subtracting numbers 1 - 100", mode: "sub2" },
          { name: "🎋 Subtracting numbers up to 10,000", mode: "sub3" },
        ],
        [
          { name: "🌱 Level 1 - Subtracting Decimals", mode: "sub_decimal1" },
          { name: "🪴 Level 2 - Subtracting Decimals", mode: "sub_decimal2" },
          { name: "🌿 Level 3 - Subtracting Decimals", mode: "sub_decimal3" },
        ],
      ],
    },
    {
      name: "Multiplication",
      modes: [
        [
          { name: "🌱  Multiplying numbers 1 - 12", mode: "mult1" },
          { name: "🌷  Multiplying numbers 1 - 25", mode: "mult2" },
          { name: "💐 Multiplying two-digit numbers", mode: "mult3" },
        ],
      ],
    },
    {
      name: "Division",
      modes: [
        [
          { name: "🍎 Dividing numbers 1 - 12", mode: "div1" },
          { name: "🍏 Dividing numbers 1 - 25", mode: "div2" },
          { name: "🍊 Dividing for two-digit numbers", mode: "div3" },
        ],
      ],
    },
  ],
  misc: [
    {
      name: "GCF/LCM",
      modes: [
        [
          {
            name: "🍎 Find the GCF of numbers of 5 - 15",
            mode: "gcf1",
          },
          {
            name: "🍏 Find the GCF of numbers 8 - 20",
            mode: "gcf2",
          },
          {
            name: "🍊 Find the GCF of numbers 12 - 50",
            mode: "gcf3",
          },
        ],
        [
          {
            name: "🌱 Find the LCM of numbers 3 - 10",
            mode: "lcm1",
          },
          {
            name: "🌷 Find the LCM of numbers 6 - 15",
            mode: "lcm2",
          },
          {
            name: "💐 Find the LCM of numbers 10 - 50",
            mode: "lcm3",
          },
        ],
      ],
    },
    {
      name: "Fractions",
      modes: [
        [
          { name: "📕 Level 1 - Add fractions", mode: "add_fraction1" },
          { name: "📘 Level 2 - Add fractions", mode: "add_fraction2" },
          { name: "📚 Level 3 - Add 3 fractions", mode: "add_fraction3" },
        ],
        [
          { name: "⭐️ Level 1 - Subtract fractions", mode: "sub_fraction1" },
          { name: "🎲 Level 2 - Subtract fractions", mode: "sub_fraction2" },
          { name: "🎖 Level 3 - Subtract 3 fractions", mode: "sub_fraction3" },
        ],
        [
          { name: "📕 Level 1 - Multiply 2 fractions", mode: "mult_fraction1" },
          { name: "📘 Level 2 - Multiply 2 fractions", mode: "mult_fraction2" },
          { name: "📚 Level 3 - Multiply 3 fractions", mode: "mult_fraction3" },
        ],
      ],
    },
  ],
  algebra: [
    {
      name: "Linear Systems",
      modes: [
        [
          { name: "📕 Level 1 - Solve an equation", mode: "lineq1" },
          { name: "📘 Level 2 - Solve an equation", mode: "lineq2" },
          { name: "📚 Level 3 - Solve an equation", mode: "lineq3" },
        ],
        [
          { name: "🪛 Lvl 1 - Solve 2-variable systems", mode: "syslinear1" },
          { name: "🔧 Lvl 2 - Solve 2-variable systems", mode: "syslinear2" },
          { name: "⚒ Lvl 3 - Solve 2-variable systems", mode: "syslinear3" },
        ],
        [
          { name: "⭐️ Lvl 1 - Solve 3-variable systems", mode: "syslinear3_1" },
          { name: "🎲 Lvl 2 - Solve 3-variable systems", mode: "syslinear3_2" },
          { name: "🎖 Lvl 3 - Solve 3-variable systems", mode: "syslinear3_3" },
        ],
      ],
    },
    {
      name: "Linear Graphs",
      modes: [
        [
          { name: "⭐️ Lvl 1 -  Find slope with 2 points", mode: "graphslope1" },
          { name: "🎲 Lvl 2 - Find slope with 2 points", mode: "graphslope2" },
          { name: "🎖 Lvl 3 - Find slope with 2 points", mode: "graphslope3" },
        ],
        [
          { name: "📕 Level 1 -  Find y-intercept", mode: "graphyint1" },
          { name: "📘 Level 2 - Find y-intercept", mode: "graphyint2" },
          { name: "📚 Level 3 - Find y-intercept", mode: "graphyint3" },
        ],
      ],
    },
    {
      name: "Quadratics",
      modes: [
        [
          { name: "📕 Level 1 - Solve x<sup>2</sup> + bx + c", mode: "solvequad1" },
          { name: "📘 Lvl 2 - Solve Quadratic Equations", mode: "solvequad2" },
          { name: "📚 Lvl 3 - Solve Quadratic Equations", mode: "solvequad3" },
        ],
        // [
        //   { name: "🪛 Lvl 1 - Factoring x<sup>2</sup> + bx + c", mode: "factorquad1" },
        //   { name: "🔧 Lvl 2 - Factoring ax<sup>2</sup> + bx + c", mode: "factorquad2" },
        //   { name: "⚒ Lvl 3 - Factoring ax<sup>2</sup> + bx + c", mode: "factorquad3" },
        // ],
        [
          { name: "✏ Lvl 1 - General Form to Vertex Form", mode: "vertex_form1" },
          { name: "🖊 Lvl 2 - General Form to Vertex Form", mode: "vertex_form2" },
          { name: "🖋 Lvl 3 - General Form to Vertex Form", mode: "vertex_form3" },
        ],
      ],
    },
  ],
  geometry: [
    // {
    //   name: "Triangles",
    //   modes: [
    //     [
    //       { name: "🍎 Level 1 - Pythagorean Theorem", mode: "pythagorean_theorem1" },
    //       { name: "🍏 Level 2 - Pythagorean Theorem", mode: "pythagorean_theorem2" },
    //       { name: "🍊 Level 3 - Pythagorean Theorem", mode: "pythagorean_theorem3" },
    //     ],
    //   ],
    // },
    {
      name: "Coordinates",
      modes: [
        [
          { name: "🪛 Level 1 - Find the distance between 2 points", mode: "distance1" },
          { name: "🔧 Level 2 - Find the distance between 2 points", mode: "distance2" },
          { name: "⚒ Level 3 - Find the distance between 2 points", mode: "distance3" },
        ],
        [
          { name: "📕 Level 1 - Find the distance between 2 points (3D)", mode: "distance3_1" },
          { name: "📘 Level 2 - Find the distance between 2 points (3D)", mode: "distance3_2" },
          { name: "📚 Level 3 - Find the distance between 2 points (3D)", mode: "distance3_3" },
        ],
      ],
    },
  ],
};

export default levels;

// Object.values(levels).forEach((c) =>
//   c.forEach((l) => l.modes.forEach((m) => m.forEach((l2) => void (l2.name.length > 40 && console.warn(`'${l2.name}' is excessively long (${l2.name.length} chars)'`)))))
// );

for (const c of Object.values(levels)) for (const l of c) for (const m of l.modes) for (const l2 of m) if (l2.name.length > 40) console.warn(`'${l2.name}' is long (${l2.name.length} chars)`);
