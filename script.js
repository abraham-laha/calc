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
let initial_flac = true;
buttons.forEach(button => button.addEventListener('click',(event) => {
    decide(button);

}));



function decide(but){
    let classes = but.getAttribute('class').split(' ');
    if(but.getAttribute('class') == 'clear'){
        display.textContent = "0";
        initial_flac = true;
    }else if(but.getAttribute('class').includes("num")){
        if(initial_flac){
            display.textContent =`${but.textContent.trim()}`;
        }else{
            display.textContent +=`${but.textContent.trim()}`;
        }
        initial_flac = false;
    }else if(but.getAttribute('class').includes("operator")){
        display.textContent+=`${but.textContent}`;
        initial_flac = false;
    }
    else{

    display.textContent+=`${but.textContent}`;
    initial_flac = false;
    }
    console.log(but);
}
