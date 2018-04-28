import {HighContrastProperty} from "./base";

class HighContrastBackgroundColor extends HighContrastProperty {
  protected static getProperty() {
    return 'background-color';
  }
}

export {HighContrastBackgroundColor};
