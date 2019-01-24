import {
  CloseParenthesis,
  OpenParenthesis,
  IOperation
} from "./operation";
import {Variable} from "./variable";
import {contains as stringContains} from "../../string/contains";
import {contains as arrayContains} from "../../array/contains";
import {stringToOperation} from "./string-to-operation";
import {zip} from "../../array/zip";
import {operationToString} from "./operation-to-string";
import {operationsInOrder} from "./operations-in-order";
import {replace} from "../../array/replace";

type FormulaPiece = IOperation | Variable | Formula;
type InterstitialFormulaPiece = IOperation | Symbol | string
type InterstitialFormula = Array<InterstitialFormulaPiece>

class Formula {
  readonly pieces_: FormulaPiece[];

  constructor(pieces: FormulaPiece[]) {
    if (Formula.hasImplicitMultiplication_(pieces)) {
      throw new Error('Formula does not support implicit multiplication.')
    }
    this.pieces_ = pieces;
  }

  public static fromString(formula: string): Formula {
    const stripped: string = formula.split(' ').join('');

    // Insert operations
    const withOperations: InterstitialFormula =
      replace(stripped.split(''), stringToOperation);

    // Group variable strings
    let withVariableStrings: InterstitialFormula = [withOperations[0]];
    for (let i = 1; i < withOperations.length; i++) {
      const value = withOperations[i];
      const lastValue = withOperations[i - 1];
      if (typeof value === 'string' && typeof lastValue === 'string') {
        withVariableStrings =
          [
            ...withVariableStrings.slice(0, -1),
            `${withVariableStrings.slice(-1)[0]}${value}`];
      } else {
        withVariableStrings = [...withVariableStrings, value];
      }
    }

    // Convert strings to variables
    const withOperationsAndVariables: Array<IOperation | Variable> =
      withVariableStrings
        .map(
          (value) => {
            return typeof value === 'string' ?
              Variable.fromString(<string>value) :
              <IOperation>value;
          });

    return new Formula(Formula.extractSubFormulas_(withOperationsAndVariables));
  }

  private static extractSubFormulas_(
    values: Array<FormulaPiece|Symbol>
  ): FormulaPiece[] {
    const result: FormulaPiece[] = [];

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value === OpenParenthesis) {
        const startIndex: number = i;
        let openParenthesesCount = 1;

        for (i = i + 1; i < values.length; i++) {
          const candidateValue = values[i];
          if (candidateValue === OpenParenthesis) {
            openParenthesesCount++;
          } else if (candidateValue === CloseParenthesis) {
            openParenthesesCount--;
          }

          if (openParenthesesCount === 0) {
            break;
          }
        }

        const subFormula: Formula =
          new Formula(Formula.extractSubFormulas_(values.slice(startIndex, i)));
        result.push(subFormula);
      } else {
        result.push(<FormulaPiece>value);
      }
    }

    return result;
  }

  public getPieces() {
    return this.pieces_;
  }

  public toString(): string {
    return this.reduce()
      .getPieces()
      .map((value) => {
        if (operationToString.has(<IOperation>value)) {
          return operationToString.get(<IOperation>value);
        } else if (value instanceof Variable) {
          return value.toString();
        }
      })
      .join(' ');
  }

  private static isVariableOrFormula_(formulaPiece: FormulaPiece): boolean {
    return formulaPiece instanceof Variable || formulaPiece instanceof Formula;
  }

  private static hasImplicitMultiplication_(pieces: FormulaPiece[]): boolean {
    const zippedPairs: FormulaPiece[][] =
      zip(pieces.slice(0, -1), pieces.slice(1));

    return zippedPairs
      .some(([a, b]) => {
        return Formula.isVariableOrFormula_(a) &&
          Formula.isVariableOrFormula_(b);
      });
  }

  public reduce(): Formula {
    const reducedSubFormulas: FormulaPiece[] =
      this.pieces_.map((piece: FormulaPiece) => {
        if (piece instanceof Formula) {
          return piece.reduce();
        } else {
          return piece;
        }
      });

    return new Formula(
      operationsInOrder.reduce(
        (lastPass, operation) => {
          let reducedFormula: Array<FormulaPiece> = [];
          for (let i = 0; i < lastPass.length; i++) {
            const lastVariable = reducedFormula.slice(-2, -1)[0];
            const operationToRun = reducedFormula.slice(-1)[0];
            const currentVariable = lastPass[i];

            if (reducedFormula.length < 2) {
              reducedFormula.push(currentVariable);
            } else if (currentVariable instanceof Formula) {
              throw new Error('Support for subformulas not yet fully implemented');
            } else if (currentVariable instanceof Variable) {
              if (
                !arrayContains(operationsInOrder, operationToRun) ||
                arrayContains(operationsInOrder, lastVariable)
              ) {
                throw new Error('Invalid formula');
              }
              if (!(lastVariable instanceof Variable)) {
                throw new Error('Support for subformulas not yet fully implemented');
              }
              if (operationToRun !== operation) {
                reducedFormula.push(currentVariable);
              } else {
                reducedFormula =
                  [
                    ...reducedFormula.slice(0, -2),
                    ...(<IOperation>operationToRun)
                      .execute(lastVariable, currentVariable)];
              }
            }
          }
          return reducedFormula;
        },
        reducedSubFormulas)
    );
  }
}

export {
  Formula,
  FormulaPiece
};
