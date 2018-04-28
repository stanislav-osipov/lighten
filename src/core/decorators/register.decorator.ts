import { engine, ComponentData } from '@core';

export const register = (data: ComponentData) => <T>(constructor: T) => {
  engine.register(data, constructor);
  console.log(data);

  return constructor;
}