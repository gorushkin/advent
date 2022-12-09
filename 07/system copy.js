class Object {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return 'qwe';
  }

  print() {
    console.log(this.toString());
  }

  isDir() {}
}

class Dir extends Object {
  constructor(name, parent = null) {
    super(name);
    this.parent = parent;
    this.isDir = true;
    this.children = {};
  }

  toString() {
    return `${this.name}:`;
  }

  isDir() {
    return this.isDir;
  }

  add(object) {
    this.children[object.name] = object;
  }
}

class File extends Object {
  constructor(name, size) {
    super(name);
    this.size = size;
    this.isDir = false;
  }

  toString() {
    return `${this.name}: ${this.size}`;
  }

  isDir() {
    return this.isDir;
  }
}

export class System {
  constructor() {
    this.system = new Dir('root', null);
    this.name = null;
    this.dir = this.system;
    this.system.add(new Dir('/', null));
  }

  loc() {
    console.log(this.dir);
  }

  cd(name) {
    if (name !== '..') {
      this.name = name;
      this.dir = this.dir.children[name];
      return;
    }
    return;
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
    console.log(this.system.children);
  }

  addCommand(str) {
    const [input, ...output] = str
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => !!item);
    const [command, argument] = input.replace('$ ', '').split(' ');
    if (command === 'cd') this.cd(argument);
    if (command === 'ls') this.ls(output);
  }
}
