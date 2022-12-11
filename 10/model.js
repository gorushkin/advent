export class Machine {
  constructor() {
    this.x = 1;
    this.cycle = 1;
    this.arg = null;
    this.history = [1];
    this.signals = [];
  }

  updateCycle() {
    if ((this.cycle - 20) % 40 === 0) {
      const signalStrength = this.cycle * this.x;
      this.signals.push(signalStrength);
    }
    this.cycle += 1;
  }

  getSignals() {
    const result = this.signals.reduce((acc, item) => acc + item);
    console.log('result: ', result);
  }

  addCommanud(rawCommand) {
    const [command, arg] = rawCommand.split(' ');
    this.updateCycle();
    if (command === 'noop') return;
    this.updateCycle();
    this.arg = arg;
    this.x += Number(arg);
    this.history.push(arg);
  }

  status() {
    console.log(this.x);
    console.log(this.cycle);
  }
}
