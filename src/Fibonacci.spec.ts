import { Fibonacci } from "./Fibonacci";

test("Basic Fibs", () => {
  const fib = new Fibonacci(10);
  expect(fib.isFib(BigInt(1))).toBe(true);
  expect(fib.isFib(BigInt(2))).toBe(true);
  expect(fib.isFib(BigInt(3))).toBe(true);
  expect(fib.isFib(BigInt(21))).toBe(true);

  expect(fib.isFib(BigInt(4))).toBe(false);
  expect(fib.isFib(BigInt(6))).toBe(false);
  expect(fib.isFib(BigInt(12))).toBe(false);
});

test("Large Fibonacci", () => {
  const fib = new Fibonacci(1000);

  expect(fib.isFib(BigInt(12586269025))).toBe(true);
  expect(fib.isFib(BigInt("18547707689471986212190138521399707760"))).toBe(
    true
  );
  expect(
    fib.isFib(
      BigInt("222232244629420445529739893461909967206666939096499764990979600")
    )
  ).toBe(true);
});
