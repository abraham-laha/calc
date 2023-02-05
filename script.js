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
let flac_plusMinus = false;
buttons.forEach(button => button.addEventListener('click',(event) => {
    decide(button);

}));



function solve(expr){
    expr = expr.replaceAll(' ', '');
    expr = expr.replaceAll('\n', '');
    let par_open = 0, par_closed = 0;
    for(let i = 0; i < expr.length; i++){
        if(expr.charAt(i)=='('){
            par_open ++;
        }
        if(expr.charAt(i)==')'){
            par_closed ++;
        }
        if(!["1","2","3","4","5", "6", "7", "8", "9","0","+","-","/","/","x","(",")","."].includes(expr.charAt(i))){
            return "Invalid Syybol";
        }
        
    }
    if(par_closed!=par_open) return "Syntax ERROR"
    console.log(expr);

}



function decide(but){
    let classes = but.getAttribute('class').split(' ');
    if(but.getAttribute('class') == 'clear'){
        flac_plusMinus = false;
        
        display.textContent = "0";
        initial_flac = true;
    }else if(but.getAttribute('class').includes("num")){
        flac_plusMinus = false;

        if(initial_flac){
            display.textContent =`${but.textContent.trim()}`;
        }else{
            display.textContent +=`${but.textContent.trim()}`;
        }
        initial_flac = false;
    }else if(but.getAttribute('class').includes("operator")){
        flac_plusMinus = false;

        display.textContent+=`${but.textContent}`;
        initial_flac = false;
    }else if(but.getAttribute('class').includes("parent")){
        flac_plusMinus = false;

        display.textContent+=`${but.textContent.trim()}`;
        initial_flac = false;
    }else if(but.getAttribute('class').includes("point")){
        flac_plusMinus = false;

        display.textContent+=`${but.textContent.trim()}`;
        initial_flac = false;
    }else if(but.getAttribute('class').includes("sign")){
        if(!flac_plusMinus){
            if(display.textContent.charAt(display.textContent.length - 1) == "+"){
                display.textContent=display.textContent.slice(0,-1) +`-`;
            }else{
                display.textContent+= `-`;
            }
            flac_plusMinus = true;
        }else{
        display.textContent= display.textContent.slice(0,-1) + '+';
        flac_plusMinus = false;
        }
        initial_flac = false;

    }else if(but.getAttribute('class').includes("equals")){
        solve(display.textContent);
        display.textContent=solve(display.textContent);;
        initial_flac=true;
    }
    else{

    display.textContent+=`ERROR`;

    }
    console.log(but);
}
