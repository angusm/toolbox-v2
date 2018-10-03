type ShouldEatFn = (e: Event) => boolean;

class EventEater {
  private target_: any;
  private fn_: (e: Event) => void;

  constructor(
    event: string,
    {
      targetParam = null,
      shouldEat = (e: Event) => true,
    }: {
      targetParam?: any,
      shouldEat?: ShouldEatFn,

    } = {}
  ) {
    this.target_ = targetParam !== null ? targetParam : window;
    this.fn_ = (e: Event) => {
      if (shouldEat(e)) {
        e.preventDefault();
      }
    };
    this.target_.addEventListener(event, this.fn_);
  }

  destroy() {
    this.target_.removeEventListener(event, this.fn_);
  }
}

export {EventEater};
