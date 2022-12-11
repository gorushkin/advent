class Rope {
  constructor() {
    this.head = { x: 0, y: 0 };
    this.tail = { x: 0, y: 0 };
    this.tailPositions = [{ x: 0, y: 0 }];
  }

  getDistance() {
    const d = Math.sqrt(
      Math.pow(this.head.y - this.tail.y, 2) + Math.pow(this.head.x - this.tail.x, 2)
    );
    return d;
  }

  updatePositions() {
    const { x, y } = this.tail;
    const isVisited = this.tailPositions.findIndex((item) => item.x === x && item.y === y);
    if (isVisited !== -1) {
      return;
    }
    this.tailPositions.push({ x, y });
  }

  moveTail({ x, y }) {
    if (x !== null) this.tail.x = x;
    if (y !== null) this.tail.y = y;
    this.updatePositions();
  }

  findNewTailPosition() {
    const distance = this.getDistance();
    if (distance <= Math.sqrt(2)) return;
    const y = this.tail.y + (this.head.y > this.tail.y ? 1 : -1);
    const x = this.tail.x + (this.head.x > this.tail.x ? 1 : -1);
    if (this.head.x === this.tail.x) {
      this.moveTail({ x: null, y });
      return;
    }
    if (this.head.y === this.tail.y) {
      this.moveTail({ x, y: null });
      return;
    }
    this.moveTail({ x, y });
  }

  moveHead(direction) {
    const mapping = {
      R: () => (this.head.x += 1),
      L: () => (this.head.x -= 1),
      U: () => (this.head.y += 1),
      D: () => (this.head.y -= 1),
    };

    mapping[direction]();
    this.findNewTailPosition();
  }

  printPositions() {
    console.log(this.tailPositions.length);
  }
}

export class Bridge {
  constructor() {
    this.rope = new Rope();
    this.width = 0;
    this.height = 0;
  }

  addMotion(motionData) {
    const [direction, steps] = motionData.split(' ');
    for (let i = 0; i < steps; i++) {
      this.rope.moveHead(direction);
    }
  }

  showTailPositions() {
    this.rope.printPositions();
  }

  getDiagram() {
    console.log('this.rope.tailPositions: ', this.rope.tailPositions);
    const parametres = this.rope.tailPositions.reduce(
      (acc, item, i, arr) => {
        const tempAcc = acc;
        if (item.x >= acc.maxX) tempAcc.maxX = item.x;
        if (item.y >= acc.maxY) tempAcc.maxY = item.y;
        if (item.x <= acc.minX) tempAcc.minX = item.x;
        if (item.y <= acc.minY) tempAcc.minY = item.y;
        return tempAcc;
      },
      {
        maxX: this.rope.tailPositions[0].x,
        maxY: this.rope.tailPositions[0].y,
        minX: this.rope.tailPositions[0].x,
        minY: this.rope.tailPositions[0].y,
      }
    );
    const height = parametres.maxX - parametres.minX;
    const width = parametres.maxY - parametres.minY;
    const offsetX = parametres.minX;
    const offsetY = parametres.minY;
    const initRows = new Array(width + 1).fill('_');
    const rowDiagramm = initRows.map((item) => new Array(height + 1).fill('_'));
    this.rope.tailPositions.forEach((item) => {
      try {
        rowDiagramm[item.y - offsetY][item.x - offsetX] = '#';
      } catch (error) {
        console.log('rrrr', item);
        throw new Error('rrr');
      }
    });
    const diiagramm = rowDiagramm.map((row) => row.join(' ')).join('\n');
    console.log(diiagramm);
  }
}
