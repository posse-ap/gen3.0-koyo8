'use strict';

{
  const CorrectAnswers = [
    {
      index: 1,
      value: '約79万人',
    },
    {
      index: 2,
      value: 'X-TECH',
    },
    {
      index: 0,
      value: 'Internet of Things',
    },
    {
      index: 0,
      value: 'Society 5.0'
    },
    {
      index: 0,
      value: 'Web3.0'
    },
    {
      index: 1,
      value: '約5倍',
    }
  ];

  const allQuiz = document.querySelectorAll('.js-quiz');

  const setDisabled = answers => {
    answers.forEach(answer => {
      answer.disabled = true;
    })
  }

  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
  }

  const setClassNameTitle = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correctTitle' : 'is-incorrectTitle');
  }

  const setClassNameBox = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correctBox' : 'is-incorrectBox')
  }

  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answer.classList.add('is-selected');
        const selectedAnswer = Number(answer.getAttribute('data-answer'));

        setDisabled(answers);

        const isCorrect = CorrectAnswers[selectedQuiz].index === selectedAnswer;

        answerText.innerText = CorrectAnswers[selectedQuiz].value;
        setTitle(answerTitle, isCorrect);
        setClassNameTitle(answerTitle, isCorrect)
        setClassNameBox(answerBox, isCorrect)
      })
    })
  })
}