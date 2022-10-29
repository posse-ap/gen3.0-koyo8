'use strict';

// Define a plugin to provide data labels
Chart.plugins.register({
  afterDatasetsDraw: function (chart, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chart.ctx;

      chart.data.datasets.forEach(function (dataset, i) {
          var meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                  // Draw the text in black, with the specified font
                  ctx.fillStyle = 'rgb(0, 0, 0)';

                  var fontSize = 16;
                  var fontStyle = 'normal';
                  var fontFamily = 'Helvetica Neue';
                  ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                  // Just naively convert to string for now
                  var dataString = dataset.data[index].toString();

                  // Make sure alignment settings are correct
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';

                  var padding = 5;
                  var position = element.tooltipPosition();
                  ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
              });
          }
      });
  }
});

let contextLang = document.querySelector('#graph-lang').getContext('2d');
          new Chart(contextLang, {
            type: 'doughnut',
            data: {
              labels: ['JavaScript', 'CSS', 'PHP', 'HTML', 'Laravel', 'SQL', 'SHELL', '情報システム基礎(その他)'],
              datasets: [{
                data: [42, 18, 10, 9, 8, 5, 4, 2],
              }]
            },
            options: {
              responsive: false,
              animation: false
            },
            plugins: [dataLabelPlugin],
          });