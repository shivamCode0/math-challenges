import { eqFix, gcf, lcm } from "./methods";

it("eq fix", () => {
  expect(eqFix("1x")).toBe("x");
  expect(eqFix("-1x")).toBe("-x");
  expect(eqFix("5x + 1y")).toBe("5x + y");
  expect(eqFix("1x - 1z")).toBe("x - z");
  expect(eqFix("11x + 21y")).toBe("11x + 21y");

  expect(eqFix("5x + 2y = -1x + 1y")).toBe("5x + 2y = -x + y");
  expect(eqFix("5B + 2c = -1p + 1K")).toBe("5B + 2c = -p + K");

  expect(eqFix("5x + 2y = - -1z")).toBe("5x + 2y = z");
  expect(eqFix("5x - -2y = - -1z")).toBe("5x + 2y = z");

  expect(eqFix("4x^2 + 3x + 4 = 0")).toBe("4x^2 + 3x + 4 = 0");
});

it("gcf", () => {
  expect(gcf(1, 2, 3)).toBe(1);
  expect(gcf(5040, 288)).toBe(144);
  expect(gcf(0, 5)).toBe(5);
  expect(gcf(17, 34)).toBe(17);
  // expect(gcf(0.4, 34)).toBe(68);
});

it("lcm", () => {
  expect(lcm(1, 2, 3)).toBe(6);
  expect(lcm(5040, 288)).toBe(10080);
  expect(lcm(2, 5)).toBe(10);
  expect(lcm(17, 34)).toBe(34);
});
