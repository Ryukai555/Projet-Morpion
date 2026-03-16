const cases = document.querySelectorAll(".case")
const victoireMessage = document.querySelector("#messageVictoire")
const boutonRejouer = document.querySelector("#rejouer")

const score1HTML = document.querySelector("#score1")
const score2HTML = document.querySelector("#score2")

const menuMode = document.querySelector("#menuMode")
const modeJoueur = document.querySelector("#modeJoueur")
const modeOrdi = document.querySelector("#modeOrdi")

let score1 = 0
let score2 = 0

let mode = "joueur"

modeJoueur.addEventListener("click", () => {

    mode = "joueur"

    menuMode.style.display = "none"

})

modeOrdi.addEventListener("click", () => {

    mode = "ordinateur"

    menuMode.style.display = "none"

})

const combinaisons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let joueur = "X"
let gameOver = false

cases.forEach(caseMorpion => {

    caseMorpion.addEventListener("click", () => {

        if (gameOver) return

        if (menuMode.style.display !== "none") return

        if (caseMorpion.textContent === "") {

            caseMorpion.textContent = joueur

            scanWin()

            if (mode === "joueur") {

                if (joueur === "X") {
                    joueur = "O"
                } else {
                    joueur = "X"
                }

            }

            if (mode === "ordinateur" && !gameOver) {

                setTimeout(ordinateurJoue, 500)

            }



        }

    })

})

function scanWin() {

    combinaisons.forEach(combo => {
        const a = cases[combo[0]].textContent
        const b = cases[combo[1]].textContent
        const c = cases[combo[2]].textContent

        if (a !== "" && a === b && b === c) {

            victoireMessage.classList.remove("hidden")
            document.querySelector("#texteVictoire").textContent = "Le joueur " + a + " gagne !"

            gameOver = true

            if (a === "X") {
                score1++
                score1HTML.textContent = score1
            } else {
                score2++
                score2HTML.textContent = score2
            }

        }
    })

}

function ordinateurJoue() {

    let casesLibres = []

    cases.forEach((caseMorpion, index) => {
        if (caseMorpion.textContent === "") {
            casesLibres.push(index)
        }
    })

    if (casesLibres.length === 0) return

    let randomIndex = casesLibres[Math.floor(Math.random() * casesLibres.length)]          

    cases[randomIndex].textContent = "O"

    scanWin()
}


boutonRejouer.addEventListener("click", resetGame)

function resetGame() {

    const cases = document.querySelectorAll(".case")

    cases.forEach(caseMorpion => {
        caseMorpion.textContent = ""
    })

    document.querySelector("#messageVictoire").classList.add("hidden")

    gameOver = false
}
