import {renderLoop} from "../../utils/render-loop";
import {removeClassModifiers} from "../../utils/dom/class/remove-class-modifiers";
import {addClassIfMissing} from "../../utils/dom/class/add-class-if-missing";
import {subtract} from "../../utils/array/subtract";
import {TbEvent} from "../../utils/event/events/tb-event";
import {eventHandler} from "../../utils/event/event-handler";

const MODIFIER = 'active';

class ActiveOnEvent {
  private baseClass_: string;
  private EventClass_: typeof TbEvent;
  private modifier_: string;

  constructor(
    baseClass: string,
    EventClass: typeof TbEvent,
    modifier: string = MODIFIER,
  ) {
    this.baseClass_ = baseClass;
    this.EventClass_ = EventClass;
    this.modifier_ = modifier;
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => {
      const candidates: HTMLElement[] =
        <HTMLElement[]>Array.from(
          document.querySelectorAll(`.${this.baseClass_}`));
      candidates.forEach((candidate) => {
        eventHandler.addListener(
          candidate,
          this.EventClass_,
          () => {
            renderLoop.measure(() => {
              const activeClass = `${this.baseClass_}--${this.modifier_}`;
              addClassIfMissing(candidate, activeClass);
            });
          });
      });
    });
  }
}

export {ActiveOnEvent};
