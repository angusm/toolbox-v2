import {Variable, VariableSymbol} from "../../math/algebra/variable";
import {IMeasurableInstance} from "../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "./interfaces/css-style-value";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {zip} from "../../array/zip";
import {Formula, FormulaPiece} from "../../math/algebra/formula";
import {contains} from "../../array/contains";

// TODO(Angus): Consolidate this class with the default CssCalcFormula

const CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS = [
  'deg',
  'rad',
  'turn',
];

class CssRotationCalcFormula implements IMeasurableInstance, ICssStyleValueInstance {
  ['constructor']: typeof CssRotationCalcFormula;
  private values_: number[];

  constructor(...values: number[]) {
    this.values_ = values;
  }

  public static fromVariables(...values: Variable[]) {
    const mappedValues: DynamicDefaultMap<VariableSymbol, number> =
      new DynamicDefaultMap<VariableSymbol, number>(
        CssRotationCalcFormula.mapValuesBySymbol_(...values),
        Map,
        () => 0);
    return new CssRotationCalcFormula(
      ...CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS
        .map((allowedUnit) => mappedValues.get(allowedUnit)));
  }

  private static mapValuesBySymbol_(...values: Variable[]): [string, number][] {
    return values
      .map<[VariableSymbol, number]>((v) => [v.symbol, v.numericValue]);
  }

  public static fromNumbers(...values: number[]): CssRotationCalcFormula {
    return new CssRotationCalcFormula(...values);
  }

  public static fromStyleString(styleString: string): CssRotationCalcFormula {
    const formula: string =
      styleString.slice(0, 4) === 'calc' ?
        styleString.slice(5, -1) :
        styleString;
    const formulaPieces = Formula.fromString(formula).reduce().getPieces();
    const variables: FormulaPiece[] =
      formulaPieces
        .filter(
          (value) => {
            return contains(
              CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS , (<Variable>value).symbol);
          })
        .filter((value) => value instanceof Variable);
    const orderedVariables: Variable[] =
      CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS .map(
        (allowedUnit) => {
          const matchingVariable =
            <Variable>(
              variables
                .find(
                  (variable) => (<Variable>variable).symbol === allowedUnit));
          return matchingVariable || new Variable(0, allowedUnit);
        });
    const values: number[] =
      orderedVariables.map((variable) => variable.numericValue);
    return new CssRotationCalcFormula(...values);
  }

  public toNumbers(): number[] {
    return this.values_.slice();
  }

  public toStyleString(): string {
    const values: string[] =
      zip<string|number>(this.values_, CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS )
        .filter(([value, unit]) => value !== 0)
        .map((pair) => pair.join(''));
    if (values.length === 0) {
      return `0`;
    } else {
      return `calc(${values.join(' + ')})`;
    }
  }
}

export {
  CssRotationCalcFormula,
  CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS
}
