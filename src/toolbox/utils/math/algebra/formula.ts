import {IOperation, Subtract} from "./operation";
import {Variable} from "./variable";
import {stringToOperation} from "./string-to-operation";
import {operationToString} from "./operation-to-string";
import {operationsInOrder} from "./operations-in-order";
import {replaceInPlace} from "../../array/replace-in-place";
import {isDefined} from "../../is-defined";
import {contains} from "../../array/contains";
import {ErrorService} from "../../error/service";

type FormulaPiece = IOperation | Variable;
type InterstitialFormulaPiece = IOperation | string;
type InterstitialFormula = InterstitialFormulaPiece[];

const formulaRegex = new RegExp(/^[A-Za-z0-9\.\-\s\+\*\/\%]*$/);

class Formula {
  private readonly pieces_: FormulaPiece[];

  constructor(pieces: FormulaPiece[]) {
    this.pieces_ = Formula.reduce_(pieces);
  }

  public static fromString(formula: string): Formula {
    if (!formulaRegex.test(formula)) {
      ErrorService.throw(`Invalid formula "${formula}", does not match regex`);
    }

    const stripped: string = formula.replace(/ /g, '');

    // Insert operations
    const withOperations: InterstitialFormula =
      replaceInPlace<InterstitialFormulaPiece>(
        stripped.split(''), stringToOperation);

    // Group variable strings
    let withOperationsAndVariables: FormulaPiece[] = [];
    let insertIndex = 0;

    let i = 0;
    while (i < withOperations.length) {
      let value = '';
      if (typeof withOperations[i] === 'string') {
        while (typeof withOperations[i] === 'string') {
          value += withOperations[i];
          i++;
        }
        withOperationsAndVariables[insertIndex] = Variable.fromString(value);
      } else {
        withOperationsAndVariables[insertIndex] = <IOperation>withOperations[i];
        i++;
      }
      insertIndex++;
    }
    return new Formula(withOperationsAndVariables);
  }

  public getPieces(): FormulaPiece[] {
    return this.pieces_;
  }

  public toString(): string {
    return this.getPieces()
      .map((value) => {
        if (operationToString.has(<IOperation>value)) {
          return operationToString.get(<IOperation>value);
        } else if (value instanceof Variable) {
          return value.toString();
        }
      })
      .join(' ');
  }

  private static reduce_(pieces: FormulaPiece[]): FormulaPiece[] {
    return Formula.reduceWithExecution_(
      Formula.reduceWithNegation_(Formula.reduceFirstNegation_(pieces)));
  }

  private static reduceFirstNegation_(pieces: FormulaPiece[]): FormulaPiece[] {
    if (pieces.length > 1 && pieces[0] === Subtract) {
      const firstValue = pieces[1];
      if (!(firstValue instanceof Variable)) {
        ErrorService.throw('Formulas should start with a Variable');
        return [];
      }
      const result = pieces.slice(1);
      result[0] = firstValue.invert();
      return result;
    } else {
      return pieces;
    }
  }

  private static reduceWithNegation_(pieces: FormulaPiece[]): FormulaPiece[] {
    const length = pieces.length;
    if (length === 0) {
      return pieces;
    }

    const firstValue = pieces[0];
    if (!(firstValue instanceof Variable)) {
      ErrorService.throw('Formulas should start with a Variable');
    }

    if (length === 1) {
      return pieces;
    }

    let result: FormulaPiece[] = [firstValue];
    let insertIndex = 1;

    const insert = (current: FormulaPiece) => {
      result[insertIndex] = current;
      insertIndex++;
    };

    for (let i = 1; i < length; i++) {
      const last = result[insertIndex - 1];
      const secondLast = result[insertIndex - 2];
      const current = pieces[i];

      if (current instanceof Variable) {
        // Implicit multiplication
        if (last instanceof Variable) {
          ErrorService.throw(
            'Formula does not support implicit multiplication.');
        } else if (last === Subtract && !(secondLast instanceof Variable)) {
          result[insertIndex - 1] = current.invert();
        } else if (!(secondLast instanceof Variable)) {
          ErrorService.throw('Formulas must have a value between operators.');
        } else {
          insert(current);
        }
      } else {
        if (!(last instanceof Variable)) {
          if (!(current === Subtract)) {
            ErrorService.throw('Formulas must have a value between operators.');
          } else if (
            !(secondLast instanceof Variable) && isDefined(secondLast)
          ) {
            ErrorService.throw('Formulas must have a value between operators.');
          } else {
            insert(current);
          }
        } else {
          insert(current);
        }
      }
    }

    return result;
  }

  private static reduceWithOperations_(
    pieces: FormulaPiece[], operations: IOperation[]
  ): FormulaPiece[] {

    const matchingOperationsList =
      operations.filter((operation) => contains(pieces, operation));
    if (matchingOperationsList.length === 0) {
      return pieces;
    }
    const matchingOperationsSet = new Set(matchingOperationsList);

    if (pieces.length === 1) {
      return pieces;
    } else if (pieces.length % 2 === 0) {
      ErrorService.throw(
        'Cannot reduce with operation on an even number of pieces');
    }

    let result: FormulaPiece[] = [pieces[0], pieces[1]];
    let insertIndex = 2;

    for (let i = 2; i < pieces.length; i+= 2) {
      const lastVariable: FormulaPiece = result[insertIndex - 2];
      const operation: FormulaPiece = result[insertIndex - 1];
      const current: FormulaPiece = pieces[i];

      // Check for errors
      if (!(lastVariable instanceof Variable)) {
        ErrorService.throw('Found IOperation where a Variable was expected');
        return [];
      }
      if (!(current instanceof Variable)) {
        ErrorService.throw('Found IOperation where a Variable was expected');
        return [];
      }
      if (operation instanceof Variable) {
        ErrorService.throw('Found Variable where a IOperation was expected');
        return [];
      }
      if (matchingOperationsSet.has(<IOperation>operation)) {
        const value = (<IOperation>operation).execute(lastVariable, current);
        if (value.length === 1) {
          result.pop(); // Remove the last two values
          result.pop();
          result[insertIndex - 2] = value[0];
          insertIndex--;
        } else {
          result[insertIndex - 2] = value[0];
          result[insertIndex - 1] = value[1];
          result[insertIndex] = value[2];
          insertIndex++;
        }
      } else {
        result[insertIndex] = current;
        insertIndex++;
      }
      if (i + 1 < pieces.length) {
        result[insertIndex] = pieces[i + 1];
        insertIndex++;
      }
    }

    return result;
  }

  private static reduceWithExecution_(pieces: FormulaPiece[]): FormulaPiece[] {
    if (pieces.length === 1) {
      return pieces;
    }
    if (pieces.length % 2 === 0) {
      ErrorService.throw(
        'Cannot reduce with execution on an even number of pieces');
    }

    return operationsInOrder.reduce(
      (result, operations) => Formula.reduceWithOperations_(result, operations),
      pieces);
  }

  public reduce(): Formula {
    console.warn(
      'Formula.reduce is deprecated. ' +
      'All formulas are now reduced at construction.');
    return this;
  }
}

export {
  Formula,
  FormulaPiece
};
