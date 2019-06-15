function getContentInFirstSetOfParentheses(s: string): string {
  if (s.indexOf('(') === -1 && s.indexOf(')') === -1) {
    return '';
  }
  if (s.indexOf('(') === -1 && s.indexOf(')') !== -1) {
    throw new Error(
      "Value passed to getContentInFirstSetOfParentheses() has no " +
      "opening parenthesis");
  }

  const startIndex = s.indexOf('(') + 1;
  let openParenthesesCount = 1;
  let currentIndex = startIndex;
  while (openParenthesesCount > 0 && currentIndex < s.length) {
    const character = s[currentIndex];
    if (character === ')') {
      openParenthesesCount--;
    } else if (character === '(') {
      openParenthesesCount++
    }
    currentIndex++;
  }

  if (openParenthesesCount > 0) {
    throw new Error(
      "Value passed to getContentInFirstSetOfParentheses() has uneven " +
      "opening/closing parentheses");
  } else {
    const endIndex = currentIndex - 1;
    return s.slice(startIndex, endIndex);
  }
}

export {getContentInFirstSetOfParentheses};
