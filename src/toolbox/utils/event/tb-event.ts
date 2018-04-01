interface ITbEvent {
  getTarget(): any;
}

interface ITbEventConstructor {
  new (...args: any[]): ITbEvent;
}

class TbEvent implements ITbEvent{
  private target_: any;

  constructor(target: any) {
    this.target_ = target;
  }

  public getTarget(): any {
    return this.target_;
  }
}

export {
  ITbEvent,
  ITbEventConstructor,
  TbEvent,
};
