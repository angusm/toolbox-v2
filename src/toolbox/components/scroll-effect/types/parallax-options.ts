interface IParallaxOptions {
  getDistanceFunction: (a: HTMLElement, b?: HTMLElement) => number,
  startDistance: number,
  endDistance: number,
  effectFunctions:
    Array<
      (target: HTMLElement, distance: number, distancePercent: number) => void>,
}

export {IParallaxOptions};
