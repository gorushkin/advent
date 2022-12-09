export class Schema {
  constructor(rawSchema) {
    this.schema = this.getSchema(rawSchema);
    this.rowLength = null;
  }

  cutRowIn(arr) {
    if (!arr.length) return '';
    const head = arr.slice(0, 3).slice(1, 2);
    const tail = arr.slice(4);
    return [head, ...this.cutRowIn(tail)];
  }

  getSchema(rawData) {
    const rows = rawData.split('\n').reverse();
    const columns = rows.reduce((acc, row) => {
      const cuttedRow = this.cutRowIn(row);
      for (let i in cuttedRow) {
        if (!acc[i]) acc[i] = [];
        if (cuttedRow[i] !== ' ') acc[i].push(cuttedRow[i]);
      }
      return acc;
    }, []);

    return columns;
  }

  oldMove({ amount, from, to }) {
    const columnFrom = this.schema[from - 1];
    const columnTo = this.schema[to - 1];
    for (let i = 1; i <= amount; i++) {
      const itemToMove = columnFrom.pop();
      columnTo.push(itemToMove);
    }
  }

  newMove({ amount, from, to }) {
    const columnFrom = [...this.schema[from - 1]];
    const columnTo = [...this.schema[to - 1]];
    const itemsToMove = columnFrom.splice(-amount);
    this.schema[to - 1] = [...columnTo, ...itemsToMove];
    this.schema[from - 1] = columnFrom;
  }

  print() {
    const rowsCount = [...this.schema].sort((a, b) => b.length - a.length)[0].length;
    const buffer = [];
    for (let i = 0; i < rowsCount; i++) {
      const row = this.schema.map((column) => (column[i] ? `[${column[i]}]` : '   ')).join(' ');
      buffer.push(row);
    }

    const result = buffer.reverse().join('\n');
    console.log(result);
  }

  getlastBoxes() {
    return this.schema.map((column) => column[column.length - 1]).join('');
  }
}
