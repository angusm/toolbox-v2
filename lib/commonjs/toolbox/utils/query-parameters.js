"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAPPINGS = [
    [' ', '%20'],
];
var QueryParameters = (function () {
    function QueryParameters() {
    }
    QueryParameters.getQueryParams = function () {
        var url = QueryParameters.getUrl_();
        var queryParamString = QueryParameters.getQueryParamsString();
        if (url.indexOf('?') === -1 || !queryParamString) {
            return {};
        }
        return queryParamString.split('&')
            .map(function (value) { return value.split('='); })
            .reduce(function (result, _a) {
            var key = _a[0], value = _a[1];
            result[key] = value;
            return result;
        }, {});
    };
    QueryParameters.getQueryParamsString = function () {
        var url = QueryParameters.getUrl_();
        return url.split('?').slice(-1)[0];
    };
    QueryParameters.getParameterByName = function (rawName) {
        var name = QueryParameters.escapeParamString_(rawName);
        return QueryParameters.unescapeParamString_(QueryParameters.getQueryParams()[name]);
    };
    QueryParameters.setParameterByName = function (rawName, rawValue, reload) {
        if (reload === void 0) { reload = false; }
        var queryParams = QueryParameters.getQueryParams();
        var name = QueryParameters.escapeParamString_(rawName);
        queryParams[name] = QueryParameters.escapeParamString_(rawValue);
        QueryParameters.updateUrl(queryParams, reload);
    };
    QueryParameters.deleteParameterByName = function (rawName, reload) {
        if (reload === void 0) { reload = false; }
        var queryParams = QueryParameters.getQueryParams();
        var name = QueryParameters.escapeParamString_(rawName);
        delete queryParams[name];
        QueryParameters.updateUrl(queryParams, reload);
    };
    QueryParameters.escapeParamString_ = function (rawKey) {
        return MAPPINGS.reduce(function (key, _a) {
            var find = _a[0], sub = _a[1];
            return key.replace(new RegExp(find, 'g'), sub);
        }, rawKey);
    };
    QueryParameters.unescapeParamString_ = function (rawKey) {
        if (!rawKey) {
            return rawKey;
        }
        return MAPPINGS.reduce(function (key, _a) {
            var sub = _a[0], find = _a[1];
            return key.replace(new RegExp(find, 'g'), sub);
        }, rawKey);
    };
    QueryParameters.getUrl_ = function () {
        return window.location.href;
    };
    QueryParameters.updateUrl = function (queryParams, reload) {
        if (reload === void 0) { reload = false; }
        var params = Object.keys(queryParams)
            .map(function (key) { return [key, queryParams[key]].join('='); })
            .join('&');
        var paramsString = params.length > 0 ? "?" + params : '';
        if (paramsString === this.getQueryParamsString()) {
            return;
        }
        if (!reload) {
            window.history.pushState({ 'path': window.location.origin + window.location.pathname }, '', "" + window.location.pathname + paramsString);
        }
        else {
            window.location.href =
                [
                    window.location.origin,
                    window.location.pathname,
                    window.location.hash,
                    paramsString
                ].join('');
        }
    };
    return QueryParameters;
}());
exports.QueryParameters = QueryParameters;
//# sourceMappingURL=query-parameters.js.map