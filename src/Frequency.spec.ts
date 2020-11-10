import { Frequency } from "./Frequency";

test("Empty Frequency", () => {
  const freq = new Frequency();
  const out = freq.getInDescendingOrder();

  expect(Array.isArray(out)).toBe(true);
  expect(out.length).toBe(0);
});

test("Single item in Frequency", () => {
  const freq = new Frequency();
  freq.add(1);
  const out = freq.getInDescendingOrder();

  expect(out.length).toBe(1);
  expect(out[0][0]).toBe("1");
  expect(out[0][1]).toBe(1);
});

test("Multiple items in Frequency", () => {
  const freq = new Frequency();

  freq.add(10);
  freq.add(8);
  freq.add(5);
  freq.add(10);
  freq.add(10);
  freq.add(8);
  freq.add(2);

  const out = freq.getInDescendingOrder();

  expect(out.length).toBe(4);
  expect(out[0][0]).toBe("10");
  expect(out[0][1]).toBe(3);

  // sorts by key descending to keep deterministic order
  expect(out[3][0]).toBe("2");
  expect(out[3][1]).toBe(1);
});

test("Same value sorting in Frequency", () => {
  const freq = new Frequency();

  freq.add(2);
  freq.add(20);

  const out = freq.getInDescendingOrder();
  expect(out[0][0]).toBe("20");
  expect(out[1][0]).toBe("2");
});
