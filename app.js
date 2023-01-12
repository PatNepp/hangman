const wordEl = document.querySelector('.word')
const wrongLetterEl = document.getElementById('wrong-letters')
const playAgainBtn = document.querySelector('.play-button')
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
    wrongLetterEl.innerHTML =  `
        ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
        ${wrongLetters.map(letter => `<span> ${letter}</span>`)} 
    `

    figureParts.forEach((part, i) => {
        const errors = wrongLetters.length;

        if(i < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Oh SHIT! You Lost! 🥲'
        popup.style.display = 'flex'
    }
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
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)

                updateWrongLettersEl()
            } else {
                showNotification()
            }
        }
    } 
})

playAgainBtn.addEventListener('click', () => {
    wrongLetters.splice(0)
    correctLetters.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]

    displayWord()

    updateWrongLettersEl()
    popup.style.display = 'none'
})

displayWord()