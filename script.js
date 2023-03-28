const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingOperator = false;

function sendinputValue(number) {
  if (awaitingOperator) {
    calculatorDisplay.textContent = number;
    awaitingOperator = false;
  } else {
    const displayedValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      calculatorDisplay.textContent === '0' ? number : displayedValue + number;
  }
}

function addDecimal() {
  if (awaitingOperator) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculation = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  if (operatorValue && awaitingOperator) {
    operatorValue = operator;
    return;
  }
  const currentValue = Number(calculatorDisplay.textContent);
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(currentValue);

    const calculate = calculation[operatorValue](firstValue, currentValue);
    console.log(operatorValue);
    calculatorDisplay.textContent = calculate;
    firstValue = calculate;
  }

  operatorValue = operator;
  awaitingOperator = true;
}

inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendinputValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

function resetAll() {
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingOperator = false;
}

clearBtn.addEventListener('click', resetAll);
