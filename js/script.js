const main_screen = document.querySelector('.main-screen')
const question = document.querySelector('.question')

const answers = document.querySelector('.answers')
const answer_buttons = document.querySelectorAll('.answer-button')
const start_button = document.querySelector('.start-button')
const plus_time_button = document.querySelector('.plus-time-button')
const minus_time_button = document.querySelector('.minus-time-button')
const start_screen = document.querySelector('.start-screen')

function getRandomSign() {
    let signs = ['+', '-', '*', '/']
    return signs[randint(0, 3)]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
    randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Повертаємо перемішаний масив
}


function randint(min, max) {
    let number = Math.round(Math.random() * (max - min) + min)
    return number
}

class Question{
    constructor(){
        this.a = randint(1,40)
        this.b = randint(1,40)
        this.sign = getRandomSign()
        this.question = this.a + this.sign + this.b
        if (this.sign == '+'){
            this.correct = this.a + this.b
        } else if (this.sign == '-'){
            this.correct = this.a - this.b
        } else if (this.sign == '*'){
            this.correct = this.a * this.b
        } else if (this.sign == '/'){
            this.correct = Math.round(this.a / this.b)
        }
        this.answers = [
            this.correct,
            randint(this.correct+1, this.correct+20),
            randint(this.correct-20, this.correct-1),
            randint(this.correct+1, this.correct+20),
            randint(this.correct-20, this.correct-1),
        ]
        shuffle(this.answers)
    }   
    display(){
        question.innerHTML = this.question
        for (let i=0; i < this.answers.length; i+=1){
            answer_buttons[i].innerHTML = this.answers [i]
        }
    }
}


let current_question = new Question()
current_question.display()
let correct_answers_counter = 0
let total_answers_counter = 0
let time = 0

plus_time_button.addEventListener('click', function(){
    time = time + 5000
})

minus_time_button.addEventListener('click', function(){
    time = time - 5000
})

start_button.addEventListener('click', function(){
    start_screen.style.display = 'none'
    main_screen.style.display = 'flex'
    current_question = new Question()
    current_question.display()
    correct_answers_counter = 0
    total_answers_counter = 0

    setTimeout(function(){
        let accuracy = Math.round(correct_answers_counter * 100 / total_answers_counter)
        let result = document.querySelector('.result')
        result.innerHTML=`Правельно: ${correct_answers_counter}
        Усього: ${total_answers_counter  }
        Точнысть: ${accuracy}%`
        start_screen.style.display= 'none'
        start_screen.style.display= 'flex'
    }, time)
})



answer_buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.innerHTML == current_question.correct) {
            correct_answers_counter +=1
            button.style.background = '#08b302'
            anime({
                targets: button,
                background: '#b5af96',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            button.style.background = '#fc0d0d'
            anime({
                targets: button,
                background: '#b5af96',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_counter += 1
        current_question = new Question()
        current_question.display()
        
    })
})