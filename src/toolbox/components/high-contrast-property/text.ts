import {HighContrastProperty} from "./base";

class HighContrastText extends HighContrastProperty {
  protected static getProperty() {
    return 'color';
  }
}

export {HighContrastText};
