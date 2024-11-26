let seconds = 0
let intervalId = null
let validExpr = []
let validExprIndex = 0

function initTimer() {
    userInput = document.querySelector(".zoneSaisie input")
    userInput.addEventListener("input", (event) => {
        let timer = document.querySelector(".optionSource span")
        let baliseWPM = document.getElementById('WPM')
        intervalId = manageTimer(timer, baliseWPM)

    }, { once: true })
}

function manageTimer(displayTimer, displayWPM) {
    return setInterval(function () {
        ++seconds
        if (seconds > 999) {
            seconds = 0;
        }
        displayTimer.textContent = seconds;
        displayWPM.textContent = Math.round(calculateWPM())
    }, 1000);
}

function calculateWPM() {
    if (validExpr[0] == motsApplication[0])
        return validExpr.length * 60 / seconds
    else {
        let nbWord = 0
        for (let i = 0; i < validExpr.length; i++) {
            nbWord += parseString(validExpr[i])
        }
        return nbWord * 60 / seconds
    }
}
function parseString(str) {
    const regex = /[a-zA-Z]+/g
    const found = str.match(regex)
    return found.length
}
