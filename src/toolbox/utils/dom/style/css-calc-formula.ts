import {Variable, VariableSymbol} from "../../math/algebra/variable";
import {IMeasurableInstance} from "../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "./interfaces/css-style-value";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {zip} from "../../array/zip";
import {Formula, FormulaPiece} from "../../math/algebra/formula";
import {contains} from "../../array/contains";

const CSS_CALC_FORMULA_ALLOWED_UNITS = [
  'px',
  '%',
  'vh',
  'vw',
  'vmin',
  'vmax',
  'em',
  'rem'
];

class CssCalcFormula implements IMeasurableInstance, ICssStyleValueInstance {
  ['constructor']: typeof CssCalcFormula;
  protected values_: number[];

  constructor(...values: number[]) {
    this.values_ = values;
  }

  public static fromVariables(...values: Variable[]) {
    const mappedValues: DynamicDefaultMap<VariableSymbol, number> =
      new DynamicDefaultMap<VariableSymbol, number>(
        CssCalcFormula.mapValuesBySymbol_(...values),
        Map,
        () => 0);
    return new CssCalcFormula(
      ...CSS_CALC_FORMULA_ALLOWED_UNITS
        .map((allowedUnit) => mappedValues.get(allowedUnit)));
  }

  private static mapValuesBySymbol_(...values: Variable[]): [string, number][] {
    return values
      .map<[VariableSymbol, number]>((v) => [v.symbol, v.numericValue]);
  }

  public static fromNumbers(...values: number[]): CssCalcFormula {
    return new CssCalcFormula(...values);
  }

  public static fromStyleString(styleString: string): CssCalcFormula {
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
              CSS_CALC_FORMULA_ALLOWED_UNITS, (<Variable>value).symbol);
          })
        .filter((value) => value instanceof Variable);
    const orderedVariables: Variable[] =
      CSS_CALC_FORMULA_ALLOWED_UNITS.map(
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
    return new CssCalcFormula(...values);
  }

  public toNumbers(): number[] {
    return this.values_.slice();
  }

  public toStyleString(): string {
    const values: string[] =
      zip<string|number>(this.values_, CSS_CALC_FORMULA_ALLOWED_UNITS)
        .filter(([value, unit]) => value !== 0)
        .map((pair) => pair.join(''));
    if (values.length === 0) {
      return `0px`;
    } else if (values.length === 1) {
      return values[0];
    } else {
      return `calc(${values.join(' + ')})`;
    }
  }
}

export {
  CssCalcFormula,
  CSS_CALC_FORMULA_ALLOWED_UNITS
}
