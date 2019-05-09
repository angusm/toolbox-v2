var getSign = !Math.sign ?
    function (x) {
        return ((x > 0) - (x < 0)) || +x;
    } :
    Math.sign;
export { getSign };
//# sourceMappingURL=get-sign.js.map