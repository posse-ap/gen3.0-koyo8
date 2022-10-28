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

  const AllQuestion = [
    {
      id: 1,
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      answers: ['約28万人', '約79万人', '約183万人'],
      correctNumber: 1,
      evidence: '経済産業省 2019年3月 － IT 人材需給に関する調査',
    },
    {
      id: 2,
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
      correctNumber: 2,
    },
    {
      id: 3,
      question: 'IoTとは何の略でしょう？',
      answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
      correctNumber: 0,
    },
    {
      id: 4,
      question: '日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？',
      answers: ['Society 5.0', 'CyPhy', 'SDGs'],
      correctNumber: 0,
      evidence: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
      id: 5,
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Web3.0', 'NFT', 'メタバース'],
      correctNumber: 0,
    },
    {
      id: 6,
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      answers: ['約2倍', '約5倍', '約11倍'],
      correctNumber: 1,
      evidence: 'Accenture Technology Vision 2021'
    }
  ]

  const quizContainer = document.getElementById('js-quizContainer')

  const createQuizHtml = (quizItem, questionNumber) => {
    const answerHtml = quizItem.answers.map((answer, answerIndex) => `<li class="QAnswerChoice">
      <button class="QAnswerButton js-answer" data-answer="${answerIndex}">${answer} </button>
      <i class="QAnswerButtonDeco"></i>
  </li>`
    ).join('');

    const evidenceHtml = quizItem.evidence ? `<p class="QAnswerEvidence"><i class="QAnswerEvidenceDeco"></i>${quizItem.evidence}</p>` : ``;

    return `<section class="QBox js-quiz" data-quiz="${questionNumber}">
  <div class="QProblem">
    <div class="QProblemTitle">Q${questionNumber + 1}</div>
    <p class="QProblemBody">${quizItem.question}</p>
    <img class="QProblemimg" src="../assets-ph1-website-main/img/quiz/img-quiz0${quizItem.id}.png" alt="クイズimg">
  </div>
  <div class="QAnswer">
    <div class="QAnswerTitle">A</div>
    <ul class="QAnswerBody">
      ${answerHtml}
    </ul>
    <div class="Correct js-answerBox">
      <p class="CorrectTitle js-answerTitle"></p>
      <p class="CorrectContent">
        <span class="CorrectContentLabel">A</span>
        <span class="js-answerText"></span>
      </p>
    </div>
  ${evidenceHtml}
  </section>`

  }

  const shuffle = arrays => {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
  }

  const quizArray = shuffle(AllQuestion)

  quizContainer.innerHTML = quizArray.map((quizItem, index) => {
    return createQuizHtml(quizItem, index)
  }).join('')

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
        const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

        setDisabled(answers);

        // const isCorrect = CorrectAnswers[selectedQuiz].index === selectedAnswer;
        const correctNumber = quizArray[selectedQuiz].correctNumber; const isCorrect = correctNumber === selectedAnswerNumber;

        // answerText.innerText = CorrectAnswers[selectedQuiz].value;
        // setTitle(answerTitle, isCorrect);
        // setClassNameTitle(answerTitle, isCorrect);
        // setClassNameBox(answerBox, isCorrect);
        answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassNameTitle(answerTitle, isCorrect);
        setClassNameBox(answerBox, isCorrect);
      })
    })
  })

  const hamburgerBar = document.querySelector('.HamburgerBar');
  const hamburgerBarTrue = document.querySelector('.HamburgerBarTrue');
  const hamburgerBarFalse = document.querySelector('.HamburgerBarFalse');
  const hamburger = document.querySelector('.Hamburger');

  hamburgerBar.addEventListener('click', () => {
    hamburgerBar.classList.toggle('active');
    hamburgerBarTrue.classList.toggle('active');
    hamburgerBarFalse.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  hamburger.addEventListener('click', () => {
    hamburgerBar.classList.toggle('active');
    hamburgerBarTrue.classList.toggle('active');
    hamburgerBarFalse.classList.toggle('active');
    hamburger.classList.toggle('active');
  })
}