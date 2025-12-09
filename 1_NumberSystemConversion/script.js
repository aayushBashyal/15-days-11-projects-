const button = document.querySelector(".btn");
let from = document.getElementById('from').value;
let to = document.getElementById('to').value;

// Mapping of String with base value 
const baseMap = {
    binary: 2,
    octal: 8,
    decimal: 10,
    hexadecimal: 16
}

button.addEventListener('click', main);

function runConversion() {
    const number = document.getElementById('numberInput').value.trim();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    const decimalValue = parseInt(number, baseMap[from]);
    if (isNaN(decimalValue)) {
        return "Invalid Input";
    }

    let finalValue = decimalValue.toString(baseMap[to]).trim().toUpperCase();

    return finalValue;
}

function invalidInput() {
    const announcement = document.createElement("h3");
    announcement.id = 'announcement';
    announcement.textContent = "Invalid input";
    display("Invalid Input");
}

/*
function display(result) {
   
    //mycode 
    const announcement = document.createElement("h3");
    announcement.id = 'announcement';
    announcement.textContent = result;
    
    const container = document.querySelector(".card-body");
    container.append(announcement);
}*/


    //better code 
    let resultBox;

function display(result) {
    if (!resultBox) {
        resultBox = document.createElement("textarea");
        resultBox.id = "resultBox";
        resultBox.className = "form-control mt-3"; 
        resultBox.rows = 2;

        document.querySelector(".card-body").appendChild(resultBox);
    }

    resultBox.value = result;
}

function main() {
    const finalValue = runConversion();
    display(finalValue);
}

