import {merge} from "./merge";

function union<T>(...sets: Set<T>[]): Set<T> {
  return merge(...sets);
}

export {union};
