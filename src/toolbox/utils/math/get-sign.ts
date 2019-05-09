const getSign: (x: number) => number =
  !Math.sign ?
    (x: number) => {
      // Use MDN polyfill for math.sign
      return (<number><unknown>(x > 0) - <number><unknown>(x < 0)) || +x;
    } :
    Math.sign;

export {getSign};
