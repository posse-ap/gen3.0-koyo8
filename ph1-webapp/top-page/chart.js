'use strict';

window.onload = function () {
  var contextBar = document.querySelector('#graph-bar').getContext('2d');

var barDatasets = [{
  label: '',
  data: [3, 4, 1, 3, 3, 4, 6, 7, 2, 4, 2, 5, 7, 8, 6, 4, 5, 1, 1, 2, 4, 3, 5, 2, 6, 8, 8, 3, 1, 4, 1],
  backgroundColor: ['rgb(60,206,255)']
}]

for (var i = 0; i < barDatasets[0].data.length; i++) {
  if (barDatasets[0].data[i] >= 4) {
    barDatasets[0].backgroundColor[i] = '	rgb(26,136,204)' // 値が4以上
  } else {
    barDatasets[0].backgroundColor[i] = 'rgb(60,206,255)' // 値が4未満
  }
}

  new Chart(contextBar, {
    type: 'bar',
    data: {
      labels: ['', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24', '', '26', '', '28', '', '30'],
      datasets: barDatasets,
      // datasets: [{
      //   label: '',
      //   data: [3, 4, 1, 3, 3, 4, 6, 7, 2, 4, 2, 5, 7, 8, 6, 4, 5, 1, 1, 2, 4, 3, 5, 2, 6, 8, 8, 3, 1, 4, 1],
      //   backgroundColor: 'rgb(60,206,255)'
      // }],
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      animation: false,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: true,
          stacked: false,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            min: 0,
            callback: function (tick) {
              return tick.toString() + 'h';
            }
          }
        }],
      },
      plugins: {
        labels: {
          fontSize: 0
        }
      }
    },
  });

  let contextLang = document.querySelector('#graph-lang').getContext('2d');
  new Chart(contextLang, {
    type: 'doughnut',
    data: {
      labels: ['JavaScript', 'CSS', 'PHP', 'HTML', 'Laravel', 'SQL', 'SHELL', '情報システム基礎(その他)'],
      datasets: [{
        data: [42, 18, 10, 9, 8, 5, 4, 2],
        datalabels: {
          
        },
        backgroundColor: [
          'rgb(3,69,236)',
          'rgb(15,113,189)',
          'rgb(32,189,222)',
          'rgb(60,206,254)',
          'rgb(178,158,243)',
          'rgb(109,70,236)',
          'rgb(74,23,239)',
          'rgb(49,5,192)',
        ]
      }]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      animation: false,
      plugins: {
        labels: {
          render: 'percentage',
          fontColor: 'white',
          fontSize: 15,
        }
      }
    },
  });

  let contextContent = document.querySelector('#graph-content').getContext('2d');
  new Chart(contextContent, {
    type: 'doughnut',
    data: {
      labels: ['ドットインストール', 'N予備校', 'POSSE課題'],
      datasets: [{
        data: [42, 33, 25],
        backgroundColor: [
          'rgb(3,69,236)',
          'rgb(15,113,189)',
          'rgb(32,189,222)'
        ]
      }]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      animation: false,
      plugins: {
        labels: {
          render: 'percentage',
          fontColor: 'white',
          fontSize: 15,
        }
      }
    }
  });
}