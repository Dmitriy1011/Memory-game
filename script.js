//Создаём элементы

let body = document.querySelector('body');
let gameField = document.createElement('section');
let cardsContainer = document.createElement('div');
let resetButton = document.createElement('button');
let allGameCards = [];
let form = document.createElement('form');
let input = document.createElement('input');
let beginGameButton = document.createElement('button');

//Присваиваем классы

gameField.classList.add('game-field');
cardsContainer.classList.add('cards-container');
resetButton.classList.add('reset-button', 'hide');
resetButton.innerText = "Начать Заново";
form.classList.add('game-form');
input.classList.add('game-input');
input.setAttribute('type', 'number');
beginGameButton.classList.add('begin-button');
input.placeholder = 'Кол-во карточек в поле';
beginGameButton.textContent = 'Начать игру';

//----------------------------------------------------

//Создаём массив

let ourArray = [];


//----------------------------------------------------


beginGameButton.addEventListener('click', e => e.preventDefault());

let inputValue = input.value;

//проверяем значение input value

function checkInputValue() {
    beginGameButton.addEventListener('click', () => {
        cardsContainer.textContent = ''
        ourArray = []
        if (input.value % 2 != 0) {
            console.log('Данные введены некорректно');
        } else if (input.value < 2) {
            console.log('Данные введены некорректно')
        } else if (input.value > 10) {
            console.log('Данные введены некорректно')
        } else {
            //Заполняем массив числами

            let inputValue = input.value;

            (function fillArrayFunc() {

                if (input.value == 2) {
                    inputValue = input.value;

                    (function fillArray() {
                        for (let i = 1; i <= inputValue; i++) {
                            ourArray.push(i, i);
                        }
                    })();
                }

                if (input.value == 4) {
                    inputValue = input.value * 2;

                    (function fillArray() {
                        for (let i = 1; i <= inputValue; i++) {
                            ourArray.push(i, i);
                        }
                    })();
                }

                if (input.value == 6) {
                    inputValue = input.value * 3;

                    (function fillArray() {
                        for (let i = 1; i <= inputValue; i++) {
                            ourArray.push(i, i);
                        }
                    })();
                }


                if (input.value == 8) {
                    inputValue = input.value * 4;

                    (function fillArray() {
                        for (let i = 1; i <= inputValue; i++) {
                            ourArray.push(i, i);
                        }
                    })();
                }

                if (input.value == 10) {
                    inputValue = input.value * 5;

                    (function fillArray() {
                        for (let i = 1; i <= inputValue; i++) {
                            ourArray.push(i, i);
                        }
                    })();
                }
            })();

            //Тасование карт, алгоритм Фишера-Йейтса

            (function shuffle() {
                for (let i = ourArray.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
                    [ourArray[i], ourArray[j]] = [ourArray[j], ourArray[i]];
                };
            })();

            // console.log(ourArray);

            chooseCardsContainerWidth();
            createCards();

            input.value = '';
        }
    })
}


//устанавливаем размеры поля для карточек


checkInputValue()

function chooseCardsContainerWidth() {
    if (input.value == 2) {
        cardsContainer.classList.add('four-cards');
    } else if (input.value == 4) {
        cardsContainer.classList.add('sixteen-cards');
    } else if (input.value == 6) {
        cardsContainer.classList.add('thirty-six-cards');
    } else if (input.value == 8) {
        cardsContainer.classList.add('sixty-four-cards');
    } else if (input.value == 10) {
        cardsContainer.classList.add('one-thousand-cards');
    }
}


//создаём карточки и заполняем их

function createCards() {

    if (input.value == 2) {
        inputValue = input.value * 2;

        for (let i = 0; i < inputValue; i++) {
            let gameCard = document.createElement('div');
            let frontSide = document.createElement('div');
            let backSide = document.createElement('div');

            gameCard.classList.add('game-card');
            frontSide.classList.add('front-side');
            backSide.classList.add('back-side');

            frontSide.textContent = ourArray[i];

            allGameCards.push(gameCard);

            gameCard.appendChild(frontSide);
            gameCard.appendChild(backSide);
            cardsContainer.appendChild(gameCard);

            allGameCards.forEach(card => card.addEventListener('click', flipCard));
        }
    }

    if (input.value == 4 || input.value == 6 || input.value == 8 || input.value == 10) {
        inputValue = input.value ** 2;

        for (let i = 0; i < inputValue; i++) {
            let gameCard = document.createElement('div');
            let frontSide = document.createElement('div');
            let backSide = document.createElement('div');

            gameCard.classList.add('game-card');
            frontSide.classList.add('front-side');
            backSide.classList.add('back-side');

            frontSide.textContent = ourArray[i];

            allGameCards.push(gameCard);

            gameCard.appendChild(frontSide);
            gameCard.appendChild(backSide);
            cardsContainer.appendChild(gameCard);

            allGameCards.forEach(card => card.addEventListener('click', flipCard));
        }
    }
}



//Прикрепляем элементы к body

form.appendChild(input);
form.appendChild(beginGameButton);
gameField.appendChild(cardsContainer);
gameField.appendChild(resetButton);
body.appendChild(gameField);
body.appendChild(form);



//Начало логики

//Переменные для логики

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockboard = false;
let gameArray = [];

//Таймер

let timer = document.createElement('span');
let timerSpan = document.createElement('div');
timerSpan.classList.add('timerSpan')
let timerSpan1 = document.createElement('div');
timerSpan1.classList.add('timer');
if (timerSpan1) {
    timerSpan1.textContent = "Осталось "
}
let timerSpan2 = document.createElement('div');
timerSpan2.classList.add('timer');
if (timerSpan2) {
    timerSpan2.textContent = " секунд"
}
document.body.append(timerSpan);
timerSpan.append(timerSpan1);
timerSpan.append(timerSpan2);
timerSpan1.append(timer);



//переменная состояния выигрыша
let checkForWinState = false

//переменная управления кликом на последующие карточки
let clickOnSecondCard = false

//событие клика по первой карточке

document.querySelector('.cards-container').addEventListener('click', () => {

        if (!clickOnSecondCard) {
            clickOnSecondCard = true
        }
})



//запуск таймера с секундами
cardsContainer.addEventListener('click', startTimer);


//переменные таймера
let zero = 0
let sec = 10;

let timeStart = null
//функция таймер
function startTimer() {

    timeStart = setInterval(tick, 1000);

    function tick() {
        timer.textContent = --sec

        if (checkForWinState === true) {
            timeStart = clearInterval(timeStart)
            console.log('clearInterval(timeStart)')
            stopGame()
        }

        if (sec === zero) {
            timeStart = clearInterval(timeStart)
            console.log('the end')
            stopGame()
        }
    }
    this.removeEventListener('click', startTimer)
}


//Функции



//переворачивание карточек
function flipCard() {
    if (lockboard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this;
    lockboard = true;

    checkForMatch();
}

//добавление класса кнопке
function addClassToButton() {
    resetButton.classList.add('show');
}


//сброс до первоначального состояние по клику на кнопку "Начать заново"
resetButton.addEventListener('click', () => {
    allGameCards.forEach(function (el) {
        el.classList.remove('flip');
        el.addEventListener('click', flipCard);
    })
    hasFlippedCard = false;
    lockboard = false;
    shuffle();
    localStorage.clear();
    timer.textContent = ''
    resetButton.classList.remove('show');

    zero = 0
    sec = 10

    checkForWinState = false

    count = 0

    cardsContainer.addEventListener('click', startTimer);
})

beginGameButton.addEventListener('click', () => {
    allGameCards.forEach(function (el) {
        el.classList.remove('flip');
        el.addEventListener('click', flipCard);
    })
    hasFlippedCard = false;
    lockboard = false;
    shuffle();
    localStorage.clear();
    timer.textContent = ''
    resetButton.classList.remove('show');

    zero = 0
    sec = 10

    checkForWinState = false

    count = 0

    cardsContainer.addEventListener('click', startTimer);
})

//переменная счетчика карточек
let count = 0;

//проверка на соответствие значений карточек
function checkForMatch() {

    if (firstCard.innerText === secondCard.innerText) {
        gameArray.push(firstCard, secondCard);
        localStorage.setItem('saveArrayValues', JSON.stringify(gameArray));

        count += 2

        console.log('Count: ', count)
        console.log('inputValue: ', inputValue)

        if (count === inputValue) {
            checkForWinState = true
            const winTimeout = setTimeout(addClassToButton, 500);
            setTimeout(addClassToButton, 500);
            clearTimeout(winTimeout)
            console.log('Timeout отработал')
            count = 0
            console.log('Обнуляем count', count)
        }

        disableCards();
        return;
    }
    unflipCards();
    return checkForWinState
}

//запретить карточкам переворачиваться 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//переворачивание карточек на обратную сторону
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//приводим переменные к начальному состоянию
function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//останавливаем игру
function stopGame() {
    lockboard = true;
    addClassToButton();
    console.log('Стоп игра')
};

//тасуем числа
function shuffle() {
    allGameCards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 16);
        card.style.order = ramdomPos;
    });
};