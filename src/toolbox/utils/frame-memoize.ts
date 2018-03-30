import {MultiValueMap} from './map/multi-value';
import {renderLoop} from './render-loop';

function clearCache(cache: MultiValueMap<any, any>): void {
  renderLoop.cleanup(() => {
    cache.clear();
    renderLoop.measure(() => clearCache(cache));
  });
}

function frameMemoize(fn: (...args: any[]) => any): (...args: any[]) => any {
  const cache: MultiValueMap<any, any> = new MultiValueMap();
  clearCache(cache);

  function frameMemoizedFn(...args: any[]): any {
    if (cache.has(...args)) {
      return cache.get(...args);
    } else {
      const result = fn(...args);
      cache.set(...args, result);
      return result;
    }
  }

  return frameMemoizedFn;
}

export {frameMemoize};
