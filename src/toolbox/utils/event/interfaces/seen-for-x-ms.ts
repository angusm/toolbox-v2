import {ITbEvent, ITbEventConstructor} from "./tb-event";

interface ISeenForXMs extends ITbEvent {

}

interface ISeenForXMsConstructor extends ITbEventConstructor {
  new (...args: any[]): ISeenForXMs;
  getThreshold(): number;
}

export {ISeenForXMsConstructor};
