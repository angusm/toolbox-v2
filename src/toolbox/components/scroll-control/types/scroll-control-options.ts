import {GetDistanceFn} from "./get-distance-fn";

interface IScrollControlOptions {
  getDistanceFunction: GetDistanceFn,
  startDistance: number,
  endDistance: number,
}

export {IScrollControlOptions};
