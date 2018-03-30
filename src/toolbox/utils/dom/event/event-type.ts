class EventType {
  public static CLICK: symbol = Symbol('click');
  public static ENTER_KEYPRESS: symbol = Symbol('enter keypress');
  public static INTERACT: symbol = Symbol('interact');
  public static MOUSE_DOWN: symbol = Symbol('mousedown');
  public static MOUSE_MOVE: symbol = Symbol('mousemove');
  public static MOUSE_UP: symbol = Symbol('mouseup');
  public static TOUCH: symbol = Symbol('touch');
  public static TOUCH_START: symbol = Symbol('touchstart');
  public static TOUCH_END: symbol = Symbol('touchend');
  public static TOUCH_MOVE: symbol = Symbol('touchmove');
  public static CURSOR_DOWN: symbol = Symbol('cursor down');
  public static CURSOR_MOVE: symbol = Symbol('cursor move');
  public static CURSOR_UP: symbol = Symbol('cursor up');
}

export {EventType};
