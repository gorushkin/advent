class Tail {
  constructor(n) {
    this.x = 0;
    this.y = 0;
    this.tail = n >= 1 ? new Tail(n - 1) : null;
    this.tailPositions = [{ x: 0, y: 0 }];
    this.depth = n;
  }

  tailInfo(x) {
    if (this.tail) {
      this.tailInfo.call(this.tail, x + this.depth);
    }
  }

  updatePositions() {
    const { x, y } = this;
    const isVisited = this.tailPositions.findIndex((item) => item.x === x && item.y === y);
    if (isVisited !== -1) {
      return;
    }
    this.tailPositions.push({ x, y });
  }

  getDistance(head) {
    const d = Math.sqrt(Math.pow(head.y - this.y, 2) + Math.pow(head.x - this.x, 2));
    return d;
  }

  moveTail({ x, y }) {
    if (x !== null) this.x = x;
    if (y !== null) this.y = y;
    this.updatePositions();
    const newHead = { x: this.x, y: this.y };
    if (this.tail) {
      this.findNewTailPosition.call(this.tail, newHead);
    }
  }

  findNewTailPosition(head) {
    const distance = this.getDistance(head);
    if (distance <= Math.sqrt(2)) return;
    const y = this.y + (head.y > this.y ? 1 : -1);
    const x = this.x + (head.x > this.x ? 1 : -1);
    if (head.x === this.x) {
      this.moveTail({ x: null, y });
      return;
    }
    if (head.y === this.y) {
      this.moveTail({ x, y: null });
      return;
    }
    this.moveTail({ x, y });
  }
}

class Rope {
  constructor(n) {
    this.head = { x: 0, y: 0 };
    this.tail = new Tail(n);
  }

  moveHead(direction) {
    const mapping = {
      R: () => (this.head.x += 1),
      L: () => (this.head.x -= 1),
      U: () => (this.head.y += 1),
      D: () => (this.head.y -= 1),
    };
    mapping[direction]();
    this.tail.findNewTailPosition(this.head);
  }

  printPositions() {
    console.log(this.tail.tailPositions.length);
  }

  info() {
    this.tail.tailInfo(2);
  }
}

export class Bridge {
  constructor() {
    this.rope = new Rope(8);
    this.width = 0;
    this.height = 0;
  }

  addMotion(motionData) {
    const [direction, steps] = motionData.split(' ');
    for (let i = 0; i < steps; i++) {
      this.rope.moveHead(direction);
    }
  }

  getDiagram(tailPositions) {
    const parametres = tailPositions.reduce(
      (acc, item, i, arr) => {
        const tempAcc = acc;
        if (item.x >= acc.maxX) tempAcc.maxX = item.x;
        if (item.y >= acc.maxY) tempAcc.maxY = item.y;
        if (item.x <= acc.minX) tempAcc.minX = item.x;
        if (item.y <= acc.minY) tempAcc.minY = item.y;
        return tempAcc;
      },
      {
        maxX: tailPositions[0].x,
        maxY: tailPositions[0].y,
        minX: tailPositions[0].x,
        minY: tailPositions[0].y,
      }
    );
    const height = parametres.maxX - parametres.minX;
    const width = parametres.maxY - parametres.minY;
    const offsetX = parametres.minX;
    const offsetY = parametres.minY;
    const initRows = new Array(width + 1).fill('_');
    const rowDiagramm = initRows.map((item) => new Array(height + 1).fill('_'));
    tailPositions.forEach((item) => {
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

  reccur() {
    this.rope.info();
  }

  showTailPositions() {
    this.rope.printPositions();
  }

  getAllDiagramms(tail = this.rope.tail) {
    const tailPositions = tail.tailPositions;
    this.getDiagram(tailPositions);
    if (tail.tail) {
      this.getDiagram(tail.tail.tailPositions)
    }
  }
}
