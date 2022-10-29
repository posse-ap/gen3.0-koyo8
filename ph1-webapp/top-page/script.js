'use strict';

const openButton = document.querySelector('.header-button');
const closeButton = document.querySelector('.modal-close-button');
const inputButton = document.querySelector('.modal-button');
const body = document.querySelector('#body');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalLoad = document.querySelector('.loader');
const modalComplete = document.querySelector('.modal-complete');
const twitterCheckbox = document.querySelector('#twitter-share');

const date = document.querySelector('#data');
const calendar = document.querySelector('#modal-calendar')

openButton.addEventListener('click' , () => {
  body.classList.add('active');
  modal.classList.remove('modal-close');
  modalBody.classList.add('modal-open');
});

closeButton.addEventListener('click' , () => {
  body.classList.remove('active');
  modalBody.classList.remove('modal-open');
  modal.classList.add('modal-close');
  if(modalBody.classList.contains('modal-off')){
    modalBody.classList.remove('modal-off');
  }
  if(modalComplete.classList.contains('modal-complete-on')){
    modalComplete.classList.remove('modal-complete-on');
  }
})

inputButton.addEventListener('click' , () => {
  if (twitterCheckbox.checked) {
    openTwiter();
  };

  modalBody.classList.add('modal-off');
  modalLoad.classList.add('modal-load-on');
  closeButton.classList.add('modal-off');
  window.setTimeout(() => {
    modalLoad.classList.remove('modal-load-on');
    modalComplete.classList.add('modal-complete-on');
    closeButton.classList.remove('modal-off');
}, 3000); //実際は3000

function openTwiter() {
  const twitterCommentText = document.getElementById('modal-twitter-comment-textbox').value;
  let twitterURL = "https://twitter.com/intent/tweet?text="+ twitterCommentText;
  window.open(twitterURL, '_blank');
}
})

date.addEventListener('click' , () => {
  calendar.classList.toggle('modal-off');
})

const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};
// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(year == today.getFullYear()
                  && month == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}