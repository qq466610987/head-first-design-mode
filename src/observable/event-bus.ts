// 用发布-订阅模式，
// 重构HeadFirst 观察者设计模式章节的气象站项目

class EventBus {
  private events: Record<string, Function[]> = {};

  constructor() {
    this.events = {};
  }

  addEventListener(event: string, listener: Function): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  removeEventListener(event: string, listener: Function): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((listener) => listener(...args));
  }
}

const eventBus = new EventBus();

const currentConditionsDisplay = {
  display: (temperature: number) => {
    console.log(`Temperature changed to ${temperature}`);
  }
}
eventBus.addEventListener('onTemperatureChange', (temperature: number) => {
  currentConditionsDisplay.display(temperature);
});
const weaterData = {
  get temperature(): number {
    return 0;
  },
  set temperature(temperature: number) {
    eventBus.emit('onTemperatureChange', temperature);
    this.temperature = temperature;
  }
}
weaterData.temperature = 20;

export { EventBus };
