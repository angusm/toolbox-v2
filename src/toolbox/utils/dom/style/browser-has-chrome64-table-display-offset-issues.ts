import {DynamicDefaultMap} from '../../map/dynamic-default';

// Checks for inconsistencies in offsets in the browser.
// Triggered for an issue in the beta version of Chrome v64
// (note: not 64-bit specifically, but the 64th version/release of Chrome)

const RESULT_KEY: symbol = Symbol('result');

const cachedResult: DynamicDefaultMap<symbol, boolean> =
  DynamicDefaultMap.usingFunction(
    (val) => {
      if (val !== RESULT_KEY) {
        console.error('Browser check function called in unusual way.');
      }

      const table = document.createElement('div');
      table.style.display = 'table';
      const spacing = document.createElement('div');
      spacing.style.display = 'table-row';
      spacing.style.height = '200px';
      const tableRow = document.createElement('div');
      tableRow.style.display = 'table-row';
      tableRow.style.position = 'relative';
      const tableCell = document.createElement('div');
      tableCell.style.display = 'table-cell';
      const target = document.createElement('div');
      target.style.display = 'inline-block';
      target.style.height = '100px';
      target.style.width = '100px';
      table.appendChild(spacing);
      table.appendChild(tableRow);
      tableRow.appendChild(tableCell);
      tableCell.appendChild(target);

      document.body.appendChild(table);

      // Run the check
      const result =
        tableRow.offsetParent === table &&
        tableRow.offsetTop === 200 &&
        tableCell.offsetParent === tableRow &&
        tableCell.offsetTop === 200 &&
        target.offsetParent === tableRow &&
        target.offsetTop === 200;

      document.body.removeChild(table);

      return result;
    });

function browserHasChrome64TableDisplayOffsetIssues(): boolean {
  return cachedResult.get(RESULT_KEY);
}

export {browserHasChrome64TableDisplayOffsetIssues};
