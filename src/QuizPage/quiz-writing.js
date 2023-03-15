'use strict';

const AllQuiz = [
  {
    id: 1,
    quesstion : '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
    answers : ['約28万人', '約79万人', '約138万人'],
    correct : 1,
      evidence: '経済産業省 2019年3月 － IT 人材需給に関する調査',
  },
  {
    id: 2,
    quesstion : '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
    answers : ['INTECH', 'BIZZTECH', 'X-TECH'],
    correct : 2,
  },
  {
    id: 3,
    quesstion : 'IoTとは何の略でしょう？',
    answers : ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
    correct : 0,
  },
  {
    id: 4,
    quesstion : '日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？',
    answers : ['Society 5.0', 'CyPhy', 'SDGs'],
    correct : 0,
    evidence : 'Society5.0 - 科学技術政策 - 内閣府',
  },
  {
    id: 5,
    quesstion : 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
    answers : ['Web3.0', 'NFT', 'メタバース'],
    correct : 0,
  },
  {
    id: 6,
    quesstion : '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
    answers : ['約2倍', '約5倍', '約11倍'],
    correct : 1,
    evidence : 'Accenture Technology Vision 2021',
  }
]

const quizContainer = document.getElementById('.js-quizContainer');

const quizHTML = (quizItem, questionNumber) => {
  const answerHTML = quizItem.answers.map((answerText, answerIndex) => {
    `<li class="QAnswerChoice">
    <button class="QAnswerButton js-answer" data-answer="${answerIndex}">${answerText} </button>
    <i class="QAnswerButtonDeco"></i>
  </li>`
  }).join('');

  const evidenceHTML = quizItem.evidence ? `<p class="QAnswerEvidence"><i class="QAnswerEvidenceDeco"></i> ${quizItem.evidence}</p>` : ``;

  return `<section class="QBox js-quiz" data-quiz="${questionNumber}">
      <div class="QProblem">
        <div class="QProblemTitle">Q${questionNumber + 1}</div>
        <p class="QProblemBody">${quizItem.question}</p>
        <img class="QProblemimg" src="../assets-ph1-website-main/img/quiz/img-quiz0${quizItem.id}.png" alt="クイズその${quizItem.id}">
      </div>
      <div class="QAnswer">
        <div class="QAnswerTitle">A</div>
        <ul class="QAnswerBody">
          ${answerHTML}
        </ul>
        <div class="Correct js-answerBox">
          <p class="CorrectTitle js-answerTitle"></p>
          <p class="CorrectContent">
            <span class="CorrectContentLabel">A</span>
            <span class="js-answerText"></span>
          </p>
        </div>
        ${evidenceHTML}
      </div>
    </section>`
}

const shuffle = arrays => {
  const array = arrays.slice();
  for (let i =array.length -1; i >=0 ; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    return array;
  }
}

const quiz = shuffle(AllQuiz);

quizContainer.innerHTML = quiz.map((quizItem, index) => {
  return quizHTML(quizItem, index);
}).join('')