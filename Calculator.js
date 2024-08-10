let body = document.querySelector('body');
let content = document.querySelector('.contents');
let btn = document.querySelectorAll('button');
let result = document.getElementById('result');
let toggleBtn = document.querySelector('.toggleBtn');
let calBtn = document.getElementById('calBtn');
let childBtn = document.getElementById('childBtn');
let normalCal = document.getElementById("normalCal");
let centerCal = document.getElementById("center-calculator");
let normalrecent = document.getElementById('normalrecent');
let functionResults = document.querySelectorAll(".function-results");
let normalcounter = 0;
let normalacCounter = 0;
let normalhistory = [];
let histories;


let inputboxes = document.querySelectorAll(".inputbox");
let currentBox = "";
let nextBox = "";
let activeFunction = false;

let calMode = "normal";
let sin = 0;
let cos = 0;
let tan = 0;

let functionRunner = function (code) { //for running math function from a string
    code = "return " + code;
    const F = new Function(code);
    return F();
}

let reversePreventDefault = function (event) { return true; }

function isOperator(params) { // for checking if its operator
    return ['+', '-', '*', '/'].some((item) => {
        return item === params;
    });
}

function isNumeric(str) {// for checking if a string contains only number
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


let preset = "";
let mathFunctions = "";
let insideFunction = false;
let functionNum = "";
let mathNumber = "";
let bracket = 0;

//awanay xware he bee calculatorakayna
let bee = document.querySelector('.bee');
let beeCal = document.getElementById("beeCal");
let hexaresult = document.getElementById('hexaresult');
let hexbutton = document.querySelectorAll(".hexbtn");
let recent = document.getElementById('recent');
let counter = 0;
let acCounter = 0;
let history = [];
let beeHistories;

let refresher = function () {
    mathFunctions = "";
    mathNumber = "";
    bracket = 0;
    insideFunction = false;
    preset = "";
}
//.............................. Normal Calculator .....................................
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        if (this.innerHTML == "=")   //aw ifa lo eshkrdny yaksanakaya
        {
            try {

                for (let i = 0; i < result.innerHTML.length; i++) {

                    if ((insideFunction && isNumeric(result.innerHTML[i])) || insideFunction && result.innerHTML[i] == ".") {
                        mathNumber += result.innerHTML[i];
                    }

                    if ((mathNumber != "" && isOperator(result.innerHTML[i])) || (mathNumber != "" && i == result.innerHTML.length - 1)) {
                        mathFunctions += mathNumber;
                        for (let i = 0; i < bracket; i++) {
                            mathFunctions += ")"
                        } 
                        
                        mathFunctions = functionRunner(mathFunctions);
                        preset += mathFunctions;
                        mathFunctions = "";
                        mathNumber = "";
                        bracket = 0;
                        if (i == result.innerHTML.length - 1) {
                            insideFunction = true;
                        }
                        else {
                            insideFunction = false;
                        }
                    }


                    if (result.innerHTML[i] == "s" && result.innerHTML[i + 1] == "i" && result.innerHTML[i + 2] == "n") {
                        mathFunctions += "(Math.sin(Math.PI / 180 * ";
                        bracket += 2;
                        insideFunction = true;
                    }
                    if (result.innerHTML[i] == "c" && result.innerHTML[i + 1] == "o" && result.innerHTML[i + 2] == "s") {
                        mathFunctions += "(Math.cos(Math.PI / 180 * ";
                        bracket += 2;
                        insideFunction = true;
                    }
                    if (result.innerHTML[i] == "t" && result.innerHTML[i + 1] == "a" && result.innerHTML[i + 2] == "n") {
                        mathFunctions += "(Math.tan(Math.PI / 180 * ";
                        bracket += 2;
                        insideFunction = true;
                    }

                    if (result.innerHTML[i] == "√") {
                        mathFunctions += "(Math.sqrt( ";
                        bracket += 2;
                        insideFunction = true;
                    }
                    if ((isNumeric(result.innerHTML[i]) || isOperator(result.innerHTML[i]) || result.innerHTML[i] == ".") && !insideFunction) {

                        preset += result.innerHTML[i];

                        if (isNumeric(result.innerHTML[i]) && (result.innerHTML[i + 2] == "s" || result.innerHTML[i + 2] == "c" || result.innerHTML[i + 2] == "t" || result.innerHTML[i + 2] == "√")) {
                            preset += "*";
                        }
                    }
                }
                result.innerHTML = Math.round(eval(preset) * 1000000) / 1000000;
                refresher();

            }
            catch (e) {
                result.innerHTML = "ERROR"
                refresher();
            }



            normalacCounter = 0;
            normalhistory.push(`<p class="my-10 cursor-pointer histories">${result.innerHTML}</p>`);
            normalrecent.innerHTML = "";
            normalhistory.forEach(element => {
                normalrecent.innerHTML += element;
            });
            historiesEvent(normalrecent.querySelectorAll(".histories"));

            normalcounter++;
            if (normalcounter == 7) {
                normalcounter--;
                normalhistory.shift();
            }

        }

        else if (this.innerHTML == "sin") {
            result.innerHTML += " " + this.innerHTML;
        }
        else if (this.innerHTML == "cos") {
            result.innerHTML += " " + this.innerHTML;
        }
        else if (this.innerHTML == "tan") {
            result.innerHTML += " " + this.innerHTML;
        }
        else if (this.innerHTML == "√") {
            result.innerHTML += " " + this.innerHTML;
        }
        else if (this.innerHTML == "+") {
            result.innerHTML += this.innerHTML;
        }

        else if (this.innerHTML == "AC")   //aw ifa lo clear allakaya
        {
            normalacCounter++;
            result.innerHTML = "";
            if (normalacCounter == 2) {
                normalrecent.innerHTML = "";
                normalhistory = [];
                normalcounter = 0;
                normalacCounter = 0;
            }
            refresher();
        }
        else if (this.innerHTML == "C") {   //aw ifa lo dugmay cleary rashkrdnaway yak letter
            let substring = result.innerHTML;
            let newresult = substring.substr(0, substring.length - 1);
            result.innerHTML = newresult;
        }
        else if (this.innerHTML == "C") {

        }
        else {
            result.innerHTML += this.innerHTML;   //aw elsea lo pshandanaway raqamakana la shashakay
        }

    })

}

//.............................. Child Calculator .....................................
for (let i = 0; i < hexbutton.length; i++) {
    hexbutton[i].addEventListener("click", function () {
        if (this.innerHTML == "=")   //aw ifa lo eshkrdny yaksanakaya
        {
            hexaresult.innerHTML = Math.round(eval(hexaresult.innerHTML) * 1000) / 1000;   //aw statementay ifakash lo awaya agar zhmaraka
            acCounter = 0;
            bee.classList.add("fly");
            setTimeout(() => {
                bee.classList.remove("fly");
            }, 1000);

            history.push(`<p class="cursor-pointer beeHistories my-10">${hexaresult.innerHTML}</p>`);
            recent.innerHTML = "";
            history.forEach(element => {
                recent.innerHTML += element;
            });
            beeHistoriesEvent(recent.querySelectorAll(".beeHistories"));
            counter++;
            if (counter == 7) {
                counter--;
                history.shift();
            }
        }                                                                            //pointy habu hata char pointm pshanda
        else if (this.innerHTML == "AC")   //aw ifa lo clear allakaya
        {
            acCounter++;
            hexaresult.innerHTML = "";
            bee.classList.add("move");
            setTimeout(() => {
                bee.classList.remove("move");
            }, 1000);

            if (acCounter == 2) {
                recent.innerHTML = "";
                history = [];
                counter = 0;
                acCounter = 0;
            }
        }
        else if (this.innerHTML == "C") {   //aw ifa lo dugmay cleary rashkrdnaway yak letter
            let substring = hexaresult.innerHTML;
            let newresult = substring.substr(0, substring.length - 1);
            hexaresult.innerHTML = newresult;
        }
        else if (this.innerHTML == "C") {

        }
        else
            hexaresult.innerHTML += this.innerHTML;   //aw elsea lo pshandanaway raqamakana la shashakay
    })

}

var r = document.querySelector(':root');
var rtemp = document.querySelector(':root');

let bgWhite = getComputedStyle(r).getPropertyValue('--bg-white');
let smokeShadow = getComputedStyle(r).getPropertyValue('--smoke-shadow');
let whiteShadow = getComputedStyle(r).getPropertyValue('--white-shadow');
let bgBlack = getComputedStyle(r).getPropertyValue('--bg-black');
let calBlack = getComputedStyle(r).getPropertyValue('--cal-black');
let blackShadow = getComputedStyle(r).getPropertyValue('--black-shadow');
let lightShadow = getComputedStyle(r).getPropertyValue('--light-shadow');
// Create a function for setting a variable value

//.............................. Dark & Light .....................................
function whiteTheme() {
    r.style.setProperty('--bg-black', bgWhite);
    r.style.setProperty('--cal-black', bgWhite);
    r.style.setProperty('--black-shadow', smokeShadow);
    r.style.setProperty('--light-shadow', whiteShadow);
    r.style.setProperty('--text-white', bgBlack);
    r.style.setProperty('--black-border', bgWhite);
}

function blackTheme() {
    r.style.setProperty('--bg-black', bgBlack);
    r.style.setProperty('--cal-black', calBlack);
    r.style.setProperty('--black-shadow', blackShadow);
    r.style.setProperty('--light-shadow', lightShadow);
    r.style.setProperty('--text-white', bgWhite);
    r.style.setProperty('--black-border', bgBlack);
}
//.............................. Toggle Buttons .....................................
toggleBtn.addEventListener("click", function () {
    if (toggleBtn.getAttribute("value") == "0") {
        whiteTheme();
        toggleBtn.setAttribute("value", "1");
    }
    else {
        blackTheme();
        toggleBtn.setAttribute("value", "0");
    }
});

//................................ Mode Buttons ...................................
calBtn.addEventListener("click", function () {
    beeCal.classList.add("none");
    normalCal.classList.remove("none");
    calMode = "normal";
});

childBtn.addEventListener("click", function () {
    normalCal.classList.add("none");
    beeCal.classList.remove("none");
    calMode = "bee";
});

// ............................... Key Events .....................................
// let keyLetter = ["a","b","c","d","e",f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,u,x,y,z,]
document.addEventListener('keydown', (event) => {
    if (event.key.charCodeAt(0) == 33 || (event.key.charCodeAt(0) >= 36 && event.key.charCodeAt(0) <= 45) || event.key.charCodeAt(0) == 59 || (event.key.charCodeAt(0) >= 91 && event.key.charCodeAt(0) <= 125) || (event.key.charCodeAt(0) >= 63 && event.key.charCodeAt(0) <= 69) || (event.key.charCodeAt(0) >= 71 && event.key.charCodeAt(0) <= 90)) {
        event.preventDefault();
    }
    if (event.key == "1") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "2") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "3") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "4") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "5") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "6") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "7") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "8") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "9") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "0") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == ".") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "+") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        }

    }
    else if (event.key == "-") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        }
        else {
            currentBox.value += event.key;
        }
    }
    else if (event.key == "*") {
        event.preventDefault();
        if (!activeFunction)
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
    }
    else if (event.key == "/") {
        event.preventDefault();
        if (!activeFunction)
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
    }
    else if (event.key == "=") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            if (currentBox.id.split("-")[0] == "sin") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.sin(Math.PI / 180 * currentBox.value) * 100000) / 100000;
            }
            else if (currentBox.id.split("-")[0] == "cos") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.cos(Math.PI / 180 * currentBox.value) * 100000) / 100000;
            }
            else if (currentBox.id.split("-")[0] == "tan") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.tan(Math.PI / 180 * currentBox.value) * 100000) / 100000;
            }
            else if (currentBox.id.split("-")[0] == "sqrt") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.sqrt(currentBox.value) * 100000) / 100000;
            }
            if (currentBox.value != "0" && currentBox.value != "") {
                currentBox.classList.add("result");
            }
        }
    }
    else if (event.key == "Backspace") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        }
        else {
            currentBox.value = currentBox.value.slice(0, -1);
            currentBox.classList.remove("result");
        }
    }
    else if (event.key == "Delete") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        }
        else {
            currentBox.value = "";
            currentBox.classList.remove("result");
        }
    }
    else if (event.key == "Enter") {
        event.preventDefault();
        if (!activeFunction) {
            calMode == "normal" ? normalBtnClicker(event) : hexBtnClicker(event);
        } else {
            if (currentBox.id.split("-")[0] == "sin") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.sin(Math.PI / 180 * currentBox.value) * 1000000) / 1000000;
            }
            else if (currentBox.id.split("-")[0] == "cos") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.cos(Math.PI / 180 * currentBox.value) * 1000000) / 1000000;
            }
            else if (currentBox.id.split("-")[0] == "tan") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.tan(Math.PI / 180 * currentBox.value) * 1000000) / 1000000;
            }
            else if (currentBox.id.split("-")[0] == "sqrt") {
                currentBox.parentElement.children[2].innerHTML = Math.round(Math.sqrt(currentBox.value) * 1000000) / 1000000;
            }
            if (currentBox.value != "" && currentBox.value != "") {
                currentBox.classList.add("result");
            }
        }
    }
    else if (event.key == "Tab") {
        event.preventDefault();
        if (activeFunction) {
            nextBox.focus();
        } else {

        }
    }
}, false);

for (let i = 0; i < inputboxes.length; i++) {
    inputboxes[i].addEventListener("focus", function (event) {
        activeFunction = true;
        currentBox = this;
        nextBox = i < inputboxes.length - 1 ? inputboxes[i + 1] : inputboxes[0];
    });
    inputboxes[i].addEventListener("blur", function (event) {
        activeFunction = false;
    });
    inputboxes[i].addEventListener("dblclick", function (e) {
        this.value = "";
        currentBox.classList.remove("result");
    })
}
inputboxes.forEach((inputbox) => {

});

function normalBtnClicker(keyStroke) {
    btn.forEach(element => {
        if (keyStroke.key == "Backspace" && element.innerHTML == "C")
            element.click();

        else if (keyStroke.key == "Delete" && element.innerHTML == "AC")
            element.click();

        else if (keyStroke.key == "Enter" && element.innerHTML == "=")
            element.click();

        else if (keyStroke.key == element.innerHTML)
            element.click();
    });
}
function hexBtnClicker(keyStroke) {
    hexbutton.forEach(element => {
        if (keyStroke.key == "Backspace" && element.innerHTML == "C")
            element.click();

        else if (keyStroke.key == "Delete" && element.innerHTML == "AC")
            element.click();

        else if (keyStroke.key == "Enter" && element.innerHTML == "=")
            element.click();

        else if (keyStroke.key == element.innerHTML)
            element.click();
    });
}

function historiesEvent(histories) {
    return histories.forEach(e => {
        console.log(e);
        e.addEventListener("click", function (e) {
            result.innerHTML += this.innerHTML;
        })
    });
}
function beeHistoriesEvent(histories) {
    return histories.forEach(e => {
        console.log(e);
        e.addEventListener("click", function (e) {
            hexaresult.innerHTML += this.innerHTML;
        })
    });
}

functionResults.forEach(element => {
    element.addEventListener("click", function (e) {
        result.innerHTML += element.innerHTML;
    })
});