function getAsList<T>(obj: any): T[] {
  return <T[]>Object.keys(obj).map((key) => obj[key]);
}

export {getAsList};
