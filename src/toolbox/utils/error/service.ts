import {TThrowHandler} from "./types";

class ErrorService {
  private static singleton_: ErrorService = null;
  private throwHandler_: TThrowHandler;

  constructor() {
    this.throwHandler_ = ErrorService.defaultThrowHandler_;
  }

  public static getSingleton(): ErrorService {
    return this.singleton_ || (this.singleton_ = new this());
  }

  public static throw(message: string): void {
    this.getSingleton().throw(message);
  }

  public throw(message: string): void {
    this.throwHandler_(message);
  }

  public overrideThrow(throwHandler: TThrowHandler): void {
    this.throwHandler_ = throwHandler;
  }

  public getThrowHandler(): TThrowHandler {
    return this.throwHandler_;
  }

  private static defaultThrowHandler_(message: string): void {
    throw new Error(message);
  }
}

export {ErrorService};
