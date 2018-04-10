interface ITbEvent {
  getTarget(): any;
}

interface ITbEventConstructor {
  new (...args: any[]): ITbEvent;
  createWatcher(target: any): () => void;
}

export {
  ITbEvent,
  ITbEventConstructor
};
