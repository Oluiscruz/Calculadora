const result = document.querySelector('.resultado');
const buttons = document.querySelectorAll('.buttons button');

let numeroAtual = '';
let primeiroOperador = null;
let operador = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerHTML = originClear ? 0 : numeroAtual.replace('.', ',');   
};

function addDigit(digit) {
    if (digit === ',' && (numeroAtual.includes(',') || !numeroAtual)) 
        return;

        if (restart){
            numeroAtual = digit;
            restart = false;
        } 
        else{
            numeroAtual += digit;
        }
    updateResult();
}

function setOperator(novoOperador) {
    if (numeroAtual) {
        calculo();

        primeiroOperador = parseFloat(numeroAtual.replace(',', '.'));
        numeroAtual = '';
    }
    operador = novoOperador
}

function calculo() {
        if (operador === null || primeiroOperador === null) return;
        let segundoOperador = parseFloat(numeroAtual.replace(',', '.'));
        let resultValue;

        switch (operador) {
            case '+':
                resultValue = primeiroOperador + segundoOperador
                break;
            case '-':
                resultValue = primeiroOperador - segundoOperador
                break;
            case 'x':
                resultValue = primeiroOperador * segundoOperador
                break;
            case '÷':
                resultValue = primeiroOperador / segundoOperador
                break;
            default:
                return;
        }

        if (resultValue.toString().split('.')[1]?.length > 5) {
            numeroAtual = parseFloat(resultValue.toFixed((5)).toString())
        } else{
            numeroAtual = resultValue.toString();
        }

        operador = null;
        primeiroOperador = null;
        restart = true;
        updateResult();
}

function clearCalculo() {
    numeroAtual = '';
    primeiroOperador = null;
    operador = null;
    updateResult(true);
}
function setporcentagem() {
    let result = parseFloat(numeroAtual) / 100;

    if (['+', '-'].includes(operador)) {
        result = result * (primeiroOperador || 1);
    }
    if (result.toString().split('.')[1]?.length > 5) {
        result = result.toFixed((5)).toString();
    }
    numeroAtual = result.toString();
    updateResult();
}
buttons.forEach ((button) => {
    button.addEventListener ('click', () => {
        const btntext = button.innerHTML;
        if (/^[0-9,]+$/.test(btntext)) {
            addDigit(btntext);
        }
        else if (['+', '-', 'x', '÷'].includes(btntext)){
            setOperator(btntext);
        }
        else if (btntext === '=') {
            calculo();
        }
        else if (btntext === 'C') {
            clearCalculo();
        }
        else if (btntext === '±') {
            numeroAtual = (parseFloat(numeroAtual || primeiroOperador) * -1).toString();
            updateResult();
        }
        else if (btntext === '%') {
            setporcentagem();
        }
    });
});