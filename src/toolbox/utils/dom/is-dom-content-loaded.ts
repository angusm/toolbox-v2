function isDomContentLoaded(): boolean {
  return document.readyState === 'complete' ||
    document.readyState === 'interactive';
}

export {isDomContentLoaded};
