const wordEl = document.querySelector('.word')
const wrongLetterEl = document.querySelector('.wrong-letters')
const playAgainBtn = document.querySelector('.play-again')
const popup = document.querySelector('.popup-container')
const notification = document.querySelector('.notification-container')
const finalMessage = document.querySelector('.final-message')
const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'conglomerate', 'guacamole', 'elephant']

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
    `

    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won! 🤪'
        popup.style.display = 'flex'
    }
}

const updateWrongLettersEl = () => {

}

const showNotification = () => {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

window.addEventListener('keydown', (e) => {
    if(e.code >= 'KeyA' && e.code <= 'KeyZ') {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                displayWord()
            } else {
                showNotification()
            }
        }
    } else {
        if(!wrongLetters.includes(letter)) {
            wrongLetters.push(letter)

            updateWrongLettersEl()
        } else {
            showNotification()
        }
    }
})

displayWord()