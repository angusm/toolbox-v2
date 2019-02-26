type TScrollEffectCallback =
  (
    target: HTMLElement,
    distanceAsPx: number,
    distancePercent: number,
    lastRunDistanceAsPx?: number,
    lastRunDistanceAsPercent?: number,
  ) => void;

export {TScrollEffectCallback}
