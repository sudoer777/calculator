// INITIALIZATION //


const simpleMath = {
    add : (a,b) => a + b,
    subtract : (a,b) => a - b,
    multiply : (a,b) => a * b,
    divide : (a,b) => a / b
};


const inputDisplay = document.getElementById("input");
const operationDisplay = document.getElementById("operation");


const clickDownSound = document.getElementById("click-down-sound");
const clickUpSound = document.getElementById("click-up-sound");


const buttons = document.getElementsByTagName("button");
Array.from(buttons).forEach(button => {
    button.addEventListener("mousedown", playDownClick);
    button.addEventListener("click", playUpClick)
});


const numberButtons = document.getElementsByClassName("numpad-number");
Array.from(numberButtons).forEach(button => {
    button.addEventListener("mousedown", appendClickedNumber);
});


const operationButtons = document.getElementsByClassName("numpad-operation");
Array.from(operationButtons).forEach(button => {
    button.addEventListener("mousedown", applyClickOperation);
});


const positiveNegativeButton = document.getElementById("numpad-positivenegative");
positiveNegativeButton.addEventListener("mousedown", swapPositiveNegative);


const decimalButton = document.getElementById("numpad-decimal");
decimalButton.addEventListener("mousedown", addDecimal);


const deleteButton = document.getElementById("numpad-delete");
deleteButton.addEventListener("mousedown", deleteNumber);


const clearButton = document.getElementById("numpad-clear");
clearButton.addEventListener("mousedown", clearDisplay);


const solveButton = document.getElementById("numpad-solve");
solveButton.addEventListener("mousedown", solve);


document.addEventListener("keydown", runKeyboardFunction);
document.addEventListener("keydown", playDownClick);
document.addEventListener("keyup", playUpClick);



let number1 = '';
let number2 = '';
let operation = '';





// FUNCTIONS //


function operate(symbol, a, b) {
    let funct;
    if(symbol == "+") funct = "add";
    if(symbol == "-") funct = "subtract";
    if(symbol == "×") funct = "multiply";
    if(symbol == "÷") funct = "divide";
    return simpleMath[funct](a,b);
}


function checkOverflow(number) {
    return (String(number).length > 23)
            || (String(number).indexOf("e") !== -1)
            || isNaN(+number);
}



function appendNumber(number) {
    if(operation && !checkOverflow(String(number2) + 1)) {
        if(number2 == "0") number2 = "";
        number2 += String(number);
        inputDisplay.textContent = number2;
    }
    else if(!checkOverflow(String(number1) + 1)) {
        if(number1 == "0") number1 = "";
        number1 += String(number);
        inputDisplay.textContent = number1;
    }
}


function applyOperation(symbol) {
    if(symbol == "*") symbol = "×";
    else if(symbol == "/") symbol = "÷";

    if(number2) {
        solve();
    }
    operation = symbol;
    operationDisplay.textContent = operation;
}


function swapPositiveNegative(e) {
    if(operation) {
        number2 = String(+number2 * -1);
        inputDisplay.textContent = number2;
    }
    else {
        number1 = String(+number1 * -1);
        inputDisplay.textContent = number1;
    }
}


function addDecimal(e) {
    if(operation) {
        if(!checkOverflow(number2) && number2.indexOf('.') === -1) {
            if(!number2) number2 = "0";
            number2 = number2 + '.';
            inputDisplay.textContent = number2;
        }
    }
    else {
        if(!checkOverflow(number1) && number1.indexOf('.') === -1) {
            if(!number1) number1 = "0";
            number1 = number1 + '.';
            inputDisplay.textContent = number1;
        }
    }
}


function deleteNumber(e) {
    if(operation) {
        if(number2 && !checkOverflow(number2)) {
            number2 = number2.substring(0, number2.length - 1);
            if(!number2 || isNaN(+number2)) number2 = "0";
            inputDisplay.textContent = number2;
        }
    }
    else {
        if(number1 && !checkOverflow(number1)) {
            number1 = number1.substring(0, number1.length - 1);
            if(!number1 || isNaN(+number1)) number1 = "0";
            inputDisplay.textContent = number1;
        }
    }
}


function clearDisplay(e) {
    number1 = '';
    number2 = '';
    operation = '';

    inputDisplay.textContent = '0';
    operationDisplay.textContent = '';
}


function solve(e) {
    if(number1 && number2) {
        number1 = String(operate(operationDisplay.textContent, +number1, +number2));
        number2 = '';
        operation = '';

        // Workaround for computer rounding error
        if(number1.length >= 18) {
            number1 = Math.round(number1 * 1000000000000000) / 1000000000000000;
        }

        inputDisplay.textContent = number1;

        operationDisplay.textContent = '';
    }
}



function runKeyboardFunction(e) {
    if(!isNaN(+e.key)) appendNumber(e.key);
    else if(e.key == '.') addDecimal();
    else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') applyOperation(e.key);
    else if(e.key == '=' || e.keyCode == 13) solve();
    else if(e.keyCode == 8) deleteNumber();
    else if(e.keyCode == 46) clearDisplay();
}


function appendClickedNumber(e) {
    appendNumber(this.textContent);
}


function applyClickOperation(e) {
    applyOperation(this.textContent);
}



function playDownClick(e) {
    clickDownSound.cloneNode(true).play();
}


function playUpClick(e) {
    clickUpSound.cloneNode(true).play();
}