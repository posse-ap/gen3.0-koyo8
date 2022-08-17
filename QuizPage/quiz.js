'use strict';

{
  // const CorrectAnswers = [
  //   {
  //     index: 1,
  //     value: '約79万人',
  //   },
  //   {
  //     index: 2,
  //     value: 'X-TECH',
  //   },
  //   {
  //     index: 0,
  //     value: 'Internet of Things',
  //   },
  //   {
  //     index: 0,
  //     value: 'Society 5.0'
  //   },
  //   {
  //     index: 0,
  //     value: 'Web3.0'
  //   },
  //   {
  //     index: 1,
  //     value: '約5倍',
  //   }
  // ];

  const AllQuestion{
    {
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      answers: ['約28万人', '約79万人', '約183万人'],
      correctNumber: 1,
      evidence: '経済産業省 2019年3月 － IT 人材需給に関する調査'
    },
    {
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
      correctNumber: 2,
    },
    {
      question: 'IoTとは何の略でしょう？',
      answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
      correctNumber: 1,
    },
    {
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Society 5.0', 'CyPhy', 'SDGs'],
      correctNumber: 0,
      evidence: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Web3.0', 'NFT', 'メタバース'],
      correctNumber: 0,
    },
    {
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      answers: ['約2倍', '約5倍', '約11倍'],
      correctNumber: 1,
      evidence: 'Accenture Technology Vision 2021'
    }
  }

  const quizContainer = document.getElementById('js-quizContainer')

  const createQuizHtml = (quizItem, questionNumber) => {
    const answerHtml = quizItem.answers.map((answer, answerIndex) => `<li class="QAnswerChoice">
      <button class="QAnswerButton js-answer" data-answer="${answerIndex}">${answer} </button>
      <i class="QAnswerButtonDeco"></i>
  </li>`
  ).join('');

  const evidenceHtml = quizItem.evidence ? `<p class="QAnswerEvidence"><i class="QAnswerEvidenceDeco"></i>${quizItem.evidence}</p>` : ``;
  }

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