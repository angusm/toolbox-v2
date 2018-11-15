/**
 * Class is used as a namespace to collect various useful Query Parameter
 * functions.
 */

// TODO(Angus): Properly type this file

type QueryParamMap = {[key: string]: string};

const MAPPINGS: Array<Array<string>> = [
  [' ', '%20'],
];

class QueryParameters {
  public static getQueryParams(): QueryParamMap {
    const url: string = QueryParameters.getUrl_();

    const queryParamString: string = url.split('?').slice(-1)[0];
    if (url.indexOf('?') === -1 || !queryParamString) {
      return {};
    }

    return queryParamString.split('&')
      .map((value) => value.split('='))
      .reduce(
        (result: QueryParamMap, [key, value]: [string, string]) => {
          result[key] = value;
          return result;
        },
        {});
  }

  public static getParameterByName(rawName: string): string {
    // Cribbed from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const name = QueryParameters.escapeParamString_(rawName);
    return QueryParameters.unescapeParamString_(
      QueryParameters.getQueryParams()[name]);
  }

  public static setParameterByName(
    rawName: string, rawValue: string, reload: boolean = false
  ): void {
    // Cribbed from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
    const queryParams = QueryParameters.getQueryParams();
    const name = QueryParameters.escapeParamString_(rawName);
    queryParams[name] = QueryParameters.escapeParamString_(rawValue);
    QueryParameters.updateUrl(queryParams, reload);
  }

  public static deleteParameterByName(rawName: string, reload: boolean = false) {
    const queryParams = QueryParameters.getQueryParams();
    const name = QueryParameters.escapeParamString_(rawName);
    delete queryParams[name];
    QueryParameters.updateUrl(queryParams, reload);
  }

  private static escapeParamString_(rawKey: string) {
    return MAPPINGS.reduce(
      (key, [find, sub]) => key.replace(new RegExp(find, 'g'), sub),
      rawKey);
  }

  private static unescapeParamString_(rawKey: string) {
    if (!rawKey) {
      return rawKey;
    }

    return MAPPINGS.reduce(
      (key, [sub, find]) => key.replace(new RegExp(find, 'g'), sub),
      rawKey);
  }

  private static getUrl_(): string {
    return window.location.href;
  }

  public static updateUrl(
    queryParams: QueryParamMap, reload:boolean = false
  ): void {
    const paramsString =
      Object.keys(queryParams)
        .map((key) => [key, queryParams[key]].join('='))
        .join('&');

    if (!reload) {
      window.history.pushState(
        {'path': window.location.origin + window.location.pathname},
        '',
        `${window.location.pathname}?${paramsString}`);
    } else {
      window.location.href =
        [window.location.origin, window.location.pathname, '?', paramsString]
          .join('');
    }
  }
}

export {QueryParameters};
