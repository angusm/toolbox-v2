/**
 * Submits HTML form data to a google form.
 * @param form The HTML form to be submitted.
 * @param callbacks Optional callback function to be run on form submission.
 */

function submitGoogleForm(form: HTMLFormElement, callback?: () => {}): void {
  form.addEventListener('submit', e => {
    let mappedInput: string[] = [];
    Array.from(form).map((input: HTMLInputElement) => {
      if (input.name && input.value !== undefined) {
        mappedInput.push(`${input.name}=${input.value}`);
      }
      return mappedInput;
    });
    const data = mappedInput.join('&');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.setRequestHeader('Accept', 'application/xml, text/xml, */*; q=0.01');
    xhr.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    xhr.send(data);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        callback();
      }
    };

    e.preventDefault();
  });
}
