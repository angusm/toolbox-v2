import {ICssStyleValueInstance} from "../interfaces/css-style-value";
import {IFilterValueInstance, IFilterValueStatic} from "./filter-value/i-filter-value";
import {getContentInFirstSetOfParentheses} from "../../../string/get-content-in-first-set-of-parentheses";
import {validFilterStrings} from "./filter-value/valid-filter-strings";
import {filterStringToClass} from "./filter-value/filter-string-to-class";
import {trim} from "../../../string/trim";

class Filter implements ICssStyleValueInstance {
  ['constructor']: typeof Filter;

  private readonly filterValues_: IFilterValueInstance[];

  constructor(filters: IFilterValueInstance[]) {
    this.filterValues_ = filters;
  }

  public getFilterValues(): IFilterValueInstance[] {
    return this.filterValues_.slice();
  }

  public getFilterValueClasses(): IFilterValueStatic[] {
    return this.filterValues_.map((value) => value.constructor);
  }

  public static fromStyleString(rawString: string): Filter {
    let remainingString = rawString;
    const filters: IFilterValueInstance[] = [];

    while (remainingString.length > 0) {
      const value = getContentInFirstSetOfParentheses(remainingString);
      const valueIndex = remainingString.indexOf(value);
      const filterFunction = remainingString.slice(0, valueIndex - 1);

      if (!validFilterStrings.has(filterFunction)) {
        throw new Error(
          `Unsupported filter function "${filterFunction}" provided to ` +
          `Toolbox Filter.`
        );
      }

      const FilterClass = filterStringToClass.get(filterFunction);

      const fullFilterValue =
        remainingString.slice(0, valueIndex + value.length + 1);
      const filter = FilterClass.fromStyleString(fullFilterValue);
      filters.push(<IFilterValueInstance>filter);

      remainingString = trim(remainingString.slice(fullFilterValue.length));
    }

    return new Filter(filters);
  }

  public toStyleString(): string {
    return this.filterValues_
      .map((filter) => filter.toStyleString())
      .join(' ');
  }

}

export {Filter};
