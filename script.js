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
    button.addEventListener("mousedown", appendNumber);
});


const operationButtons = document.getElementsByClassName("numpad-operation");
Array.from(operationButtons).forEach(button => {
    button.addEventListener("mousedown", applyOperation);
});


const solveButton = document.getElementById("numpad-solve");
solveButton.addEventListener("mousedown", solve);



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
    return String(number).length > 23;
}


function appendNumber(e) {
    if(operation && !checkOverflow(number2 + 1)) {
        number2 += this.textContent;
        inputDisplay.textContent = number2;
    }
    else if(!checkOverflow(number1 + 1)) {
        number1 += this.textContent;
        inputDisplay.textContent = number1;
    }
}


function applyOperation(e) {
    if(!number2) {
        operation = this.textContent;
        operationDisplay.textContent = operation;
    }
}


function solve(e) {
    if(number1 && number2) {
        number1 = String(operate(operationDisplay.textContent, +number1, +number2));
        number2 = '';
        operation = '';
        
        inputDisplay.textContent = number1;

        operationDisplay.textContent = '';
    }
}



function playDownClick(e) {
    clickDownSound.cloneNode(true).play();
}


function playUpClick(e) {
    clickUpSound.cloneNode(true).play();
}