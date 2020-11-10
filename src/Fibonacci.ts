function* fibonacciGenerator(n: number) {
  let current = BigInt(0);
  let next = BigInt(1);

  while (n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

class Fibonacci {
  map: Set<BigInt>;

  constructor(upTo: number) {
    this.map = new Set();
    this.generate(upTo);
  }

  generate(upTo: number) {
    for (let i of fibonacciGenerator(upTo)) {
      this.map.add(i);
    }
  }

  isFib(n: BigInt) {
    // specification of Set requires sublinear time for has()
    return this.map.has(n);
  }
}

export { Fibonacci };
