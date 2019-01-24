interface IEvent {
  getTarget(): any;
}

interface IEventConstructor {
  new (...args: any[]): IEvent;
  createWatcher(target: any): () => void;
}

export {
  IEvent,
  IEventConstructor
};
