class Object {
  constructor(name) {
    this.name = name;
  }

  toString() {
    throw new Error('not implemented');
  }

  isFile() {
    return this.type === 'file';
  }

  isDir() {
    return this.type === 'dir';
  }

  print() {
    throw new Error('not implemented');
  }

  getDirSizes(n) {
    return '';
  }
}

class Dir extends Object {
  constructor(name, parent = null) {
    super(name);
    this.parent = parent;
    this.children = [];
    this.size = 0;
    this.type = 'dir';
  }

  toString() {
    return `${this.name}:`;
  }

  add(object) {
    this.children.push(object);
    const size = this.getSize();
    this.size = size;
  }

  getChild(name) {
    const child = this.children.find((item) => item.name === name);
    return child;
  }

  getSize() {
    const size = this.children.reduce((acc, item) => acc + Number(item.getSize()), 0);
    return size;
  }

  print(n = 1) {
    const prefix = '  '.repeat(n);
    const children = this.children
      .map((item) => item.print(n + 1))
      .map((item) => `${prefix}${item}`)
      .join('\n');
    const title = `${this.name} (dir, size = ${this.size})`;
    return children ? `${title}\n${children}` : `${title}`;
  }

  getDirSizes() {
    const name = this.name;
    const childrens = this.children
      .filter((item) => item.isDir())
      .reduce((acc, item) => [...acc, ...item.getDirSizes()], []);
    return [{ name, size: this.size }, ...childrens];
  }
}

class File extends Object {
  constructor(name, size) {
    super(name);
    this.size = size;
    this.type = 'file';
  }

  toString() {
    return `${this.name}: ${this.size}`;
  }

  print() {
    return `${this.name} (file, size = ${this.size})`;
  }

  getSize() {
    return this.size;
  }
}

export class System {
  constructor() {
    this.system = new Dir('/', null);
    this.name = null;
    this.dir = this.system;
  }

  loc() {
    console.log(this.dir);
  }

  cd(name) {
    if (name === '/') {
      this.dir = this.system;
      return;
    }
    if (name === '..') {
      this.dir = this.dir.parent;
      this.dir.print();
      return;
    }
    this.name = name;
    const child = this.dir.getChild(name);
    if (child) this.dir = child;
  }

  ls(output) {
    output.forEach((element) => {
      const [left, right] = element.split(' ');
      if (left === 'dir') {
        const dir = new Dir(right, this.dir);
        this.dir.add(dir);
      } else {
        const file = new File(right, left);
        this.dir.add(file);
      }
    });
  }

  print() {
    console.log(this.system.print());
  }

  getSize() {
    const result = this.system.getSize();
    return result;
  }

  getDirSizes(n) {
    const sizes = this.system.getDirSizes(n).filter(({ size }) => size < n && size > 0);
    const result = sizes.reduce((acc, item) => acc + item.size, 0);
    return result;
  }

  addCommand(str) {
    if (!str) return;
    const [input, ...output] = str
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => !!item);
    const [command, argument] = input.replace('$ ', '').split(' ');
    if (command === 'cd') this.cd(argument);
    if (command === 'ls') this.ls(output);
  }
}
