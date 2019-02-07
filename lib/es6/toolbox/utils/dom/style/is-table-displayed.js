import { toBool } from '../../to-bool';
var TABLE_DISPLAY_STYLES = [
    'table',
    'table-cell',
    'table-row',
];
function isTableDisplayed(element) {
    return toBool(TABLE_DISPLAY_STYLES.find(function (style) { return element.style.display === style; }));
}
export { isTableDisplayed };
//# sourceMappingURL=is-table-displayed.js.map