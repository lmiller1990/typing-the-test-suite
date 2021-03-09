export declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithin(floor: number, ceil: number): R
    }
  }
}