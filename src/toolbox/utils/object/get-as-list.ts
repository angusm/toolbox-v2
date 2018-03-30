function getAsList<T>(obj: any): T[] {
  return Object.keys(obj).map((key) => obj[key]);
}

export {getAsList};
