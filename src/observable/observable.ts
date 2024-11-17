interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

interface Observer {
  update(temperature: number): void;
}

interface DisplayElement {
  display(): void;
}

class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number;

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this.temperature));
  }

  public measurementsChanged(): void {
    this.notifyObservers();
  }

  public setMeasurements(temperature: number): void {
    this.temperature = temperature;
    this.measurementsChanged();
  }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temperature: number | undefined;
  private _weatherData: Subject;

  constructor(weatherData: Subject) {
    this._weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  public update(temperature: number): void {
    this.temperature = temperature;
    this.display();
  }

  public display(): void {
    console.log(`Current conditions: ${this.temperature}F degrees`);
  }
}

export { WeatherData, CurrentConditionsDisplay };


