/**
@param { number } score: score achieved by the user
@param { number } nombreQuestions: number of question answered by the user
*/
function afficherResultat(score, nombreQuestions) {

    let span = document.querySelector(".zoneScore span")
    let affichageScore = `${score} / ${nombreQuestions}`
    span.innerText = affichageScore

}

function sendMail(nom, email, score) {
    let mailto = `mailto:${email}+?subject+Partage du score AzerType&body=Salut, je suis ${nom} et je viens de réaliser un score de ${score} sur AzerType !`
    location.href = mailto
}

function choisirPhrasesOuMots() {

    let listRadioInput = document.querySelectorAll('input[name="optionSource"]')
    for (let i = 0; i < listRadioInput.length; i++) {
        if (listRadioInput[i].checked) {
            return listRadioInput[i].id
        }
    }
    return listRadioInput[0].id
}

function validerNom(nom) {
    let regex = new RegExp("[a-zA-Z]+")
    if (!regex.test(nom.trim())) {
        throw new Error(`Le champ nom est mal complété ${nom}`)
    }
}

function verifierEmail(email) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+") //  [a-zA-Z0-9]+(\.[a-zA-Z0-9]*)?@[a-zA-Z]+\.[a-zA-Z]*
    if (!regex.test(email.trim())) {
        throw new Error(`Le champ email est mal complété ${email}`)
    }
}
function afficherProposition(elem) {
    let dispSpan = document.querySelector(".zoneProposition span")
    dispSpan.innerText = `${elem}`
}


function gererFormulaire(scoreForm) {
    try {

        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value

        verifierEmail(email)
        validerNom(nom)
        sendMail(nom, email, scoreForm)
        afficherMessageErreur("")

    } catch (Error) {
        afficherMessageErreur(Error)
    }

}

function afficherMessageErreur(Error) {
    let spanErreurMessage = document.getElementById("spanErreurMessage")
    if (!spanErreurMessage) {
        let balisePopUp = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "spanErreurMessage"

        balisePopUp.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = Error
}
function initRetryBtn() {
    let baliseRetryBtn = document.querySelector(".btn-retry")
    baliseRetryBtn.addEventListener("click", () => {
        location.href = ''
    })
}
function disableRadioInputs(radioinputList) {
    for (let i = 0; i < radioinputList.length; i++) {
        radioinputList[i].disabled = true
    }
}
function initRadioBtn() {

    let radioinputList = document.querySelectorAll('input[name="optionSource"]')
    userInput = document.querySelector(".zoneSaisie input")
    userInput.addEventListener("input", (event) => {
        disableRadioInputs(radioinputList)
    }, { once: true })
}

function lancerBoucleDeJeu() {

    initAddEventListenerPopup()
    initTimer()
    initRetryBtn()
    initRadioBtn()
    let score = 0
    let cpt = 0
    let selectedList = motsApplication
    let btnValiderMot = document.querySelector(".zoneSaisie button")
    let playerInput = document.querySelector(".zoneSaisie input")
    let baliseWPM = document.getElementById('WPM')

    afficherProposition(selectedList[cpt])
    btnValiderMot.addEventListener("click", () => {
        if (playerInput.value != "") {
            if (playerInput.value === selectedList[cpt]) {
                score++
                validExpr[validExprIndex] = selectedList[cpt]
                validExprIndex++
            }
            cpt++
            afficherResultat(score, cpt)
            playerInput.value = ""
            afficherProposition(selectedList[cpt])
            if (selectedList[cpt] === undefined) {
                btnValiderMot.disabled = true
                playerInput.disabled = true
                afficherProposition("Partie terminée")
                baliseWPM.textContent = calculateWPM()
                clearInterval(intervalId)
            }
        }
    })
    document.addEventListener("keypress", (event) => {
        if (event.key == 'Enter' && selectedList[cpt] != undefined && playerInput.value != "") {
            if (playerInput.value === selectedList[cpt]) {
                score++
                validExpr[validExprIndex] = selectedList[cpt]
                validExprIndex++
            }
            cpt++

            afficherResultat(score, cpt)
            playerInput.value = ""
            afficherProposition(selectedList[cpt])
            if (selectedList[cpt] === undefined) {
                btnValiderMot.disabled = true
                playerInput.disabled = true
                afficherProposition("Partie terminée")
                baliseWPM.textContent = Math.round(calculateWPM())
                clearInterval(intervalId)
            }
        }
    })
    let listRadioInput = document.querySelectorAll('input[name="optionSource"]')

    for (let i = 0; i < listRadioInput.length; i++) {
        listRadioInput[i].addEventListener("change", (event) => {
            if (seconds === 0) {
                if (listRadioInput[i].id === "mots") {
                    selectedList = motsApplication
                } else {
                    selectedList = listePhrase
                }
                if (selectedList[cpt] != undefined) {
                    afficherProposition(selectedList[cpt])
                }
                playerInput.value = ""
            }
        })
    }
    form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreForm = `${score} / ${cpt}`
        gererFormulaire(scoreForm)
    })

}

