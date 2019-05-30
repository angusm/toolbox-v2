import {
  CloseParenthesis, OpenParenthesis, IOperation, Subtract
} from "./operation";
import {Variable} from "./variable";
import {contains as arrayContains} from "../../array/contains";
import {stringToOperation} from "./string-to-operation";
import {zip} from "../../array/zip";
import {operationToString} from "./operation-to-string";
import {operationsInOrder} from "./operations-in-order";
import {replaceInPlace} from "../../array/replace-in-place";

type FormulaPiece = IOperation | Variable | Formula;
type InterstitialFormulaPiece = IOperation | Symbol | string
type InterstitialFormula = Array<InterstitialFormulaPiece>

class Formula {
  private readonly pieces_: FormulaPiece[];

  constructor(pieces: FormulaPiece[]) {
    if (Formula.hasImplicitMultiplication_(pieces)) {
      throw new Error('Formula does not support implicit multiplication.')
    }
    this.pieces_ = pieces;
  }

  public static fromString(formula: string): Formula {
    const stripped: string = formula.replace(/ /g, '');

    // Insert operations
    const withOperations: InterstitialFormula =
      replaceInPlace<InterstitialFormulaPiece>(
        stripped.split(''), stringToOperation);

    let hasSubformula = false;

    // Group variable strings
    // NOTE: Intentionally verbose for sake of performance
    let withOperationsAndVariables: Array<FormulaPiece|Symbol> = [];
    let currentString = '';
    let insertIndex = 0;
    for (let i = 0; i < withOperations.length; i++) {
      const value = withOperations[i];
      hasSubformula = value === OpenParenthesis || hasSubformula;
      if (typeof value === 'string') {
        currentString += value;
      } else {
        if (currentString) {
          if (insertIndex === 1 && withOperationsAndVariables[0] === Subtract) {
            insertIndex = 0;
            currentString = `-${currentString}`;
          }
          withOperationsAndVariables[insertIndex] =
            Variable.fromString(currentString);
          withOperationsAndVariables[insertIndex + 1] = value;
          currentString = '';
          insertIndex += 2
        } else {
          withOperationsAndVariables[insertIndex] = value;
          insertIndex++;
        }
      }
    }
    if (currentString) {
      withOperationsAndVariables[insertIndex] =
        Variable.fromString(currentString);
    }

    if (hasSubformula) {
      return new Formula(
        Formula.extractSubFormulas_(withOperationsAndVariables));
    } else {
      return new Formula(<FormulaPiece[]>withOperationsAndVariables);
    }
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
    return this.reduce().getPieces()
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
          let reducedFormula: Array<FormulaPiece> = [lastPass[0]];

          for (let i: number = 2; i < lastPass.length; i += 2) {
            const lastVariable = reducedFormula.slice(-1)[0];
            const operationToRun = lastPass[i - 1];
            const currentVariable = lastPass[i];

            if (currentVariable instanceof Formula) {
              throw new Error(
                'Support for subformulas not yet fully implemented');
            } else if (currentVariable instanceof Variable) {
              if (arrayContains(operationsInOrder, lastVariable)) {
                throw new Error('Operation found where variable was expected');
              }
              if (!(lastVariable instanceof Variable)) {
                throw new Error(
                  'Support for subformulas not yet fully implemented');
              }
              // Operation is not the one we're running at the oment
              if (operationToRun !== operation) {
                reducedFormula =
                  [...reducedFormula, operationToRun, currentVariable];
              } else {
                reducedFormula =
                  [
                    ...reducedFormula.slice(0, -1),
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
