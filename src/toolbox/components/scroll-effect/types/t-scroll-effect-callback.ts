type TScrollEffectCallback =
  (
    target: Element,
    distanceAsPx: number,
    distancePercent: number,
    lastRunDistanceAsPx?: number,
    lastRunDistanceAsPercent?: number,
  ) => void;

export {TScrollEffectCallback}
