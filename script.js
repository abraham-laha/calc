function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function devide(a,b){
    return a/b;
}

function operate(a, oper, b){
    switch (oper){
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case ":":
        case "/":
            return devide(a,b);
            break;
        default:
            console.log("Unknown operator");

    }
}

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
buttons.forEach(button => button.addEventListener('click',(event) => {
    decide(button);

}));



function decide(but){
    let classes = but.getAttribute('class').split(' ');
    display.textContent+=`${but.textContent}`;
    console.log(but);
}
