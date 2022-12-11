class Tree {
  constructor(height, x, y) {
    this.x = Number(x);
    this.y = Number(y);
    this.height = Number(height);
  }
}

export class Forest {
  constructor() {
    this.forest = [];
    this.rows = [];
    this.columns = [];
  }

  addTreeToEntity(tree, index, entity) {
    if (!entity[index]) entity.push([]);
    entity[index].push(tree);
  }

  addTreeToRow(tree, rowIndex) {
    this.addTreeToEntity(tree, rowIndex, this.rows);
  }

  addTreeToColumn(tree, columnIndex) {
    this.addTreeToEntity(tree, columnIndex, this.columns);
  }

  addTree(height, rowIndex, columnIndex) {
    const tree = new Tree(height, rowIndex, columnIndex);
    this.addTreeToRow(tree, rowIndex);
    this.addTreeToColumn(tree, columnIndex);
    this.forest.push(tree);
  }

  printEntities(entity) {
    const string = entity.map((row) => row.map((tree) => tree.height).join(' ')).join('\n');
    console.log(string);
  }

  printRows() {
    this.printEntities(this.rows);
  }

  printColumns() {
    this.printEntities(this.columns);
  }

  parseMap(rawData) {
    const rows = rawData.split('\n').filter((n) => !!n);
    rows.forEach((row, rowIndex) => {
      const splittedRow = row.split('');
      splittedRow.forEach((height, columnIndex) => {
        this.addTree(height, rowIndex, columnIndex);
      });
    });
  }

  printEntity(index, entity) {
    return entity[index].map((item) => item.height).join('');
  }

  printColumn(y) {
    console.log(this.printEntity(y, this.columns));
  }

  printRow(x) {
    console.log(this.printEntity(x, this.rows));
  }

  getRelatedTrees(x, y) {
    const treeRow = this.rows[x];
    const treeColumn = this.columns[y];
    return {
      right: treeRow.slice(y + 1, treeRow.length),
      left: treeRow.slice(0, y),
      down: treeColumn.slice(x + 1, treeColumn.length),
      up: treeColumn.slice(0, x),
    };
  }

  checkTreeVisibility(tree, index) {
    const reduceList = (list) => list.reduce((acc, item) => acc && height > item.height, true);

    const { x, y, height } = tree;
    const trees = this.getRelatedTrees(x, y);

    const visibility = Object.entries(trees).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: reduceList(value) }),
      {}
    );
    return Object.values(visibility).reduce((acc, item) => item || acc, false);
  }

  getVisibleTrees() {
    const trees = this.forest.filter((tree, index) => this.checkTreeVisibility(tree, index));
    console.log('visible trees: ', trees.length);
  }

  getDownScore(height, trees) {
    let score = 0;
    for (let i = trees.length - 1; i >= 0; i--) {
      const comparedTree = trees[i];
      score += 1;
      if (height <= comparedTree.height) break;
    }
    return score;
  }

  getUpScore(height, trees) {
    let score = 0;
    for (let i = 0; i < trees.length; i++) {
      const comparedTree = trees[i];
      score += 1;
      if (height <= comparedTree.height) break;
    }
    return score;
  }

  getTreeScenicScore(tree, index) {
    const { x, y, height } = tree;
    const trees = this.getRelatedTrees(x, y);

    const left = this.getDownScore(height, trees.left);
    const right = this.getUpScore(height, trees.right);
    const up = this.getDownScore(height, trees.up);
    const down = this.getUpScore(height, trees.down);
    const scores = { left, right, up, down };
    const score = Object.values(scores).reduce((acc, item) => acc * item, 1);
    return { ...tree, score, scores };
  }

  getScenicScores() {
    const scores = this.forest.map((item, index) => this.getTreeScenicScore(item, index));
    const maxTree = scores.reduce((max, item) => (item.score > max.score ? item : max));
    console.log('maxTree: ', maxTree);
  }
}
