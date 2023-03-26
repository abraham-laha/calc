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


function addParentMinus(expr){
    let newExpr = '';
    for (let i = 0; i < expr.length; i++){
        if(expr.charAt(i) == '-' &&( (i==0) || ['-','+','/','x'].includes(expr.charAt(i-1)))){
            newExpr += '(-';
            let j = i+1;
            if(expr.charAt(j)=='('){
                let parOp = 1;
                let parClos = 0;
                newExpr+= expr.charAt(j);
                j++;
                while(parClos!=parOp){
                    if(expr.charAt(j)=='('){
                        parOp++;
                    }
                    if(expr.charAt(j)==')'){
                        parClos++;
                    }
                    j++;
                }
                newExpr += addParentMinus(expr.slice(i+2,j-1));
                newExpr += ')';
            }else{
                while(j < expr.length && ["1","2","3","4","5", "6", "7", "8", "9","0",'.'].includes(expr.charAt(j))){
                    newExpr += expr.charAt(j);
                    j++;
                }
            }
            newExpr+=')';
            newExpr+=expr.charAt(j);
            i = j;
        }else{
            if(i<expr.length){
                newExpr+=expr.charAt(i);
            }
        }

    }
    return newExpr;

}

function makeMinusPlus(expr){
    //two Minus two Plus
    let newExpr = expr.charAt(0);
    let minusInfolge = 0;
    for(let i = 1; i < expr.length; i++){
        if(expr.charAt(i)==expr.charAt(i-1) && expr.charAt(i)=='-'){
            if(minusInfolge%2==1){
                newExpr = newExpr.slice(0,-1);
                if(minusInfolge<2){
                    newExpr += '+';
                }
            }else{
                newExpr+=expr.charAt(i);
            }
            minusInfolge ++;
        }else{
            
            newExpr+=expr.charAt(i);
            if(expr.charAt(i)=='-'){
                minusInfolge++;
            }else{
                minusInfolge = 0;
            }
        }

    }
    let neuExpr = '';
    // Make Single Minus a Plus
    for(let i = 0; i < newExpr.length; i++){
        if(newExpr.charAt(i)=='-' && ["1","2","3","4","5", "6", "7", "8", "9","0"].includes(newExpr.charAt(i-1))){
            neuExpr+='+-';   
        }else{
            neuExpr += newExpr.charAt(i);
        }
    }
    return neuExpr;
}


function solve(expr){
    expr = expr.replaceAll(' ', '');
    expr = expr.replaceAll('\n', '');
    let par_open = 0, par_closed = 0;
    let flac_point = false;
    //Check for Wrong Input 
    for(let i = 0; i < expr.length; i++){
        if(expr.charAt(i)=='('){
            par_open ++;
        }
        if(expr.charAt(i)==')'){
            par_closed ++;
            if(par_open<par_closed) return "Syntax ERROR";
        }
        if(!["1","2","3","4","5", "6", "7", "8", "9","0","+","-","/","/","x","(",")","."].includes(expr.charAt(i))){
            return "Invalid Syybol";
        }
        if(i>=1){
            if(['/', 'x','+','.'].includes(expr.charAt(i)) && ['-','+','/','x','(','.'].includes(expr.charAt(i-1))){
                 return "Syntax ERROR";
            }
            if(expr.charAt(i)=='.' && expr.charAt(i-1)=='.') return "Syntax ERROR";
            if(expr.charAt(i)==')' && expr.charAt(i-1)=='(') return "Syntax ERROR";
        }
        if(["1","2","3","4","5", "6", "7", "8", "9","0",'.'].includes(expr.charAt(i)) && flac_point){
            if(expr.charAt(i)=='.'){
                return "Syntax ERROR"; 
            } 

        }else{
            flac_point = false;
        }
        if(expr.charAt(i)=='.' && !flac_point){
            flac_point = true;
        }

        
    }
    if(par_closed!=par_open) return "Syntax ERROR";
    //let exprChanged = addParent(expr);
    if (['-','+','/','x','(','.'].includes(expr.charAt(expr.length - 1))) return "Syntax Error";

    expr= makeMinusPlus(expr);
    expr = addParentMinus(expr);
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

        display.textContent=solve(display.textContent);;
        initial_flac=true;
    }
    else{

    display.textContent+=`ERROR`;

    }
}
