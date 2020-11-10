type Entry = [string, number];

class Frequency {
  private frequencyTable: { [k: string]: number };

  constructor() {
    this.frequencyTable = {};
  }

  public add(n: number | BigInt) {
    const key = String(n);

    if (!this.frequencyTable[key]) {
      this.frequencyTable[key] = 0;
    }

    this.frequencyTable[key]++;
  }

  private sortByValueThenKey(a: Entry, b: Entry) {
    const valueSort = b[1] - a[1];
    const keySort = Number(BigInt(b[0]) - BigInt(a[0]));

    return valueSort || keySort;
  }

  public getInDescendingOrder() {
    const entries: Entry[] = Object.entries(this.frequencyTable);
    entries.sort(this.sortByValueThenKey);
    return entries;
  }
}

export { Frequency };
