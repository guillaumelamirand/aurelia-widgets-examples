import {ValidationRenderer, RenderInstruction, ValidateResult} from 'aurelia-validation';

export class BootstrapFormRenderer implements ValidationRenderer {
    render(instruction: RenderInstruction) {
        for (let { result, elements } of instruction.unrender) {
            if (elements.length > 0) {
                let firstElement = elements[0];
                this.remove(firstElement, result);
            }
        }

        for (let { result, elements } of instruction.render) {
            if (elements.length > 0) {
                let firstElement = elements[0];
                this.add(firstElement, result);
            }
        }
    }

    add(element: Element, result: ValidateResult) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }

        if (result.valid) {
            if (!formGroup.classList.contains('has-error')) {
                formGroup.classList.add('has-success');
            }
        } else {
            // add the has-error class to the enclosing form-group div
            formGroup.classList.remove('has-success');
            formGroup.classList.add('has-error');

            // add help-block if not existing
            const message = formGroup.querySelector(`#validation-message-${result.propertyName}`);
            if (!message) {
                const message = document.createElement('span');
                message.className = 'help-block validation-message';
                message.textContent = result.message;
                message.id = `validation-message-${result.propertyName}`;
                formGroup.appendChild(message);
            }
        }
    }

    remove(element: Element, result: ValidateResult) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }

        if (result.valid) {
            if (formGroup.classList.contains('has-success')) {
                formGroup.classList.remove('has-success');
            }
        } else {
            // remove help-block
            const message = formGroup.querySelector(`#validation-message-${result.propertyName}`);
            if (message) {
                formGroup.removeChild(message);

                // remove the has-error class from the enclosing form-group div
                if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
                    formGroup.classList.remove('has-error');
                }
            }
        }
    }
}

