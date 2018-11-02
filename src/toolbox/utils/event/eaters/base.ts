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

    } = {},
    options?: any
  ) {
    this.target_ = targetParam !== null ? targetParam : window;
    this.fn_ = (e: Event) => {
      if (shouldEat(e)) {
        e.preventDefault();
        return false;
      }
    };
    this.target_.addEventListener(event, this.fn_, options);
  }

  destroy() {
    this.target_.removeEventListener(event, this.fn_);
  }
}

export {EventEater};
