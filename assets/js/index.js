function ValidateCPF(cpf) {
    Object.defineProperty(this, 'newCPF', {
        enumerable: true,
        configurable: false,

        get: function() {
            return cpf.replace(/\D+/g, '');
        }
    });

}

ValidateCPF.prototype.calculateDigit = function(string) {
    const array = Array.from(string);
    
    let multiplier = array.length + 1;
    
    const reduced = array.reduce(function(counter, value) {
        counter += (Number(value) * multiplier);
        multiplier--;

        return counter;
    }, 0);

    const number = 11 - (reduced % 11);

    return number > 9 ? '0' : String(number);
}


ValidateCPF.prototype.validate = function() {
    if(typeof this.newCPF === 'undefined') return false;
    if(this.newCPF.length !== 11) return false;
    
    const cpf9Char = this.newCPF.slice(0, -2);

    const firstDigit = this.calculateDigit(cpf9Char);
    const secondDigit = this.calculateDigit(cpf9Char + firstDigit);

    const completeCPF = cpf9Char + firstDigit + secondDigit; 

     return completeCPF === this.newCPF;
}

function cleanInput(input) {
    input.value = '';
    input.focus();
}

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cpfInput = document.querySelector('.input');
    const cpfInputValue = document.querySelector('.input').value;
    const display = document.querySelector('.display');
    const cpf = new ValidateCPF(cpfInputValue);
    
    if(cpf.validate()) {
        display.innerHTML = 'Este CPF é válido';
        display.classList.add('valid');
        display.classList.remove('invalid');
    } else {
        display.innerHTML = 'Este CPF é inválido';
        display.classList.add('invalid');
        display.classList.remove('valid');
    }

    cleanInput(cpfInput);
});
