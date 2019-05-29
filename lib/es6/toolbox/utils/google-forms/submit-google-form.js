function submitGoogleForm(form, callback) {
    form.addEventListener('submit', function (e) {
        var mappedInput = [];
        Array.from(form).map(function (input) {
            if (input.name && input.value !== undefined) {
                mappedInput.push(input.name + "=" + input.value);
            }
            return mappedInput;
        });
        var data = mappedInput.join('&');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.setRequestHeader('Accept', 'application/xml, text/xml, */*; q=0.01');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback();
            }
        };
        e.preventDefault();
    });
}
//# sourceMappingURL=submit-google-form.js.map