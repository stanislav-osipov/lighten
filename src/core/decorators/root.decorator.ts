import { engine, RootData } from '@core';

export const root = (data: RootData) => <T>(constructor: T) => {
  engine.setRoot(data);
  console.log(data);

  return constructor;
}