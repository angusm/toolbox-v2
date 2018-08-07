/**
 * Created by angusm on 07/08/18.
 */
interface IEffect {
  run(target: HTMLElement, distance: number, distancePercent: number): void;
  destroy(): void;
}

export {IEffect};