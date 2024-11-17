import { describe, it, expect,vi } from "vitest";
import { WeatherData } from "./observable";
import { CurrentConditionsDisplay } from "./observable";

describe('Observable', () => {
  it('should display the current conditions', () => {
    const weatherData = new WeatherData();
    const currentDisplay = new CurrentConditionsDisplay(weatherData);
    vi.spyOn(currentDisplay, 'display');
    vi.spyOn(console, 'log');

    weatherData.setMeasurements(80);
    expect(currentDisplay.display).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Current conditions: 80F degrees');
  });
});
