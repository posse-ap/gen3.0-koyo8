<?php

$dsn = 'mysql:dbname=posse;host=db';
$user = 'root';
$password = 'root';

$pdo = new PDO('mysql:host=db;dbname=web-app','root','root');

$today = date('Y-m-d');
$month = date('Y-m');

$sql = 'SELECT sum(hour) FROM times WHERE date = :date';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':date', $today);
$stmt->execute();
$today_hour = $stmt->fetch();

$sql = 'SELECT sum(hour) FROM times WHERE date LIKE :date';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':date', $month . '%');
$stmt->execute();
$month_hour = $stmt->fetch();

$sql = 'SELECT sum(hour) FROM times';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$total_hour = $stmt->fetch();

$sql = 'SELECT * FROM times WHERE date LIKE :date';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':date', $month . '%');
$stmt->execute();
$month_times = $stmt->fetchAll();

$sql = 'SELECT SUBSTRING(date, 9, 2), sum(hour) FROM times WHERE date LIKE :date GROUP BY date ORDER BY date ASC';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':date', $month . '%');
$stmt->execute();
$month_hours = $stmt->fetchAll();

$sql = 'SELECT date, hour, content FROM times JOIN study_contents ON times.id = study_contents.times_id';
$stmt = $pdo->prepare($sql);
$stmt->execute();

$sql = 'SELECT sum(hour), content FROM times JOIN study_contents ON times.id = study_contents.times_id GROUP BY content';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$contents_hour = $stmt->fetchAll();

$sql = 'SELECT count(times_id), date FROM times JOIN study_contents ON times.id = study_contents.times_id GROUP BY date';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$contents_count = $stmt->fetchAll();

// $sql = 'SELECT sum(hour), s.content FROM (SELECT sum(hour) / count(study_contents.content) as hour, count(times_id), date FROM times JOIN study_contents ON times.id = study_contents.times_id GROUP BY date) as s GROUP BY content';

$sql = 'SELECT sum(hour), content FROM (SELECT sum(hour) / POWER(count(study_contents.times_id), 2) as hour, count(times_id), study_contents.times_id FROM times JOIN study_contents ON times.id = study_contents.times_id GROUP BY times_id) as s LEFT OUTER JOIN study_contents ON s.times_id = study_contents.times_id GROUP BY study_contents.content ORDER BY sum(hour) DESC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$contents = $stmt->fetchAll();

$sql = 'SELECT sum(hour), language FROM (SELECT sum(hour) / POWER(count(study_languages.times_id), 2) as hour, count(times_id), study_languages.times_id FROM times JOIN study_languages ON times.id = study_languages.times_id GROUP BY times_id) as s LEFT OUTER JOIN study_languages ON s.times_id = study_languages.times_id GROUP BY study_languages.language ORDER BY sum(hour) DESC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$languages = $stmt->fetchAll();

?><pre>
  <? var_dump($contents_hour); ?>
  -----------------------------------------------------------
  <? var_dump($contents_count); ?>
  -----------------------------------------------------------
  <? var_dump($contents); ?>
</pre><?

// phpでjsonを書いた
// $data = [
//   [
//     "day" => 1,
//     "time" => 3
//   ],
//   [
//     "day" => 2,
//     "time" => 4
//   ],
//   [
//     "day" => 3,
//     "time" => 5
//   ]
// ];

// foreach ($month_times as $value) {
//   $value = $value;
// }

// $jsonData = json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
// file_put_contents("./data.json", $jsonData);

// 棒グラフのところやりたい
// jsonでphpの関数をjsにもっていく
// dateだけ、hourだけにしたい

?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>top-page</title>
  <link rel="stylesheet" href="./styles/reset1.css">
  <link rel="stylesheet" href="./styles/style.css">
  <script src="./scripts/script.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
  <script src="../chartjs-plugin-labels-master/src/chartjs-plugin-labels.js"></script>
  <!-- <script src="./scripts/chart.js" defer></script> -->
</head>

<body id="body">
  <header>
    <span class="header-left">
      <div class="header-logo"><img src="../../assets-ph1-website-main/img/logo.svg" alt=""></div>
      <div class="header-week">4th week</div>
    </span>
    <span>
      <button class="header-button">記録・投稿</button>
    </span>
  </header>
  <main>
    <div class="box-left">
      <div class="box-left-up">
        <div class="time-today time-box">
          <div class="time-title">Today</div>
          <div class="time-body">
            <? if(isset($today_hour["sum(hour)"])) {
              echo $today_hour["sum(hour)"];
            } else {
              echo "0";
            } ?>
          </div>
          <div class="time-sub">hour</div>
        </div>
        <div class="time-month time-box">
          <div class="time-title">Month</div>
          <div class="time-body">
          <? if(isset($month_hour["sum(hour)"])) {
              echo $month_hour["sum(hour)"];
            } else {
              echo "0";
            } ?>
          </div>
          <div class="time-sub">hour</div>
        </div>
        <div class="time-total time-box">
          <div class="time-title">Total</div>
          <div class="time-body">
          <? if(isset($month_hour["sum(hour)"])) {
              echo $total_hour["sum(hour)"];
            } else {
              echo "0";
            } ?>
          </div>
          <div class="time-sub">hour</div>
        </div>
      </div>
      <div class="graph-bar">
        <canvas id="graph-bar" class=""></canvas>
      </div>
    </div>
    <div class="box-right">
      <div class="graph-lang graph-right">
        <div class="graph-lang-title graph-title">学習言語</div>
        <div class="graph-lang-canvas">
          <canvas id="graph-lang" class="graph-lang"></canvas>
        </div>
        <div class="graph-lang-index">
          <ul>
            <li>JavaScript</li>
            <li>CSS</li>
            <li>PHP</li>
            <li>HTML</li>
            <li>Laravel</li>
            <li>SQL</li>
            <li>SHELL</li>
            <li>情報システム基礎知識(その他)</li>
          </ul>
        </div>
      </div>
      <div class="graph-content graph-right">
        <div class="graph-content-title graph-title">学習コンテンツ</div>
        <canvas id="graph-content" class="graph-content"></canvas>
        <div class="graph-content-index">
          <ul>
            <li>ドットインストール</li>
            <li>N予備校</li>
            <li>POSSE課題</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ここからモーダル -->
    <div class="modal-wrapper modal-close">
      <div class="modal modal-close">
        <button class="modal-close-button"></button>

        <div id="modal-calendar" class="modal-off">
          <div class="modal-calendar">
            <!-- xxxx年xx月を表示 -->
            <h1 id="header"></h1>

            <!-- ボタンクリックで月移動 -->
            <div id="next-prev-button">
              <button id="prev" onclick="prev()">‹</button>
              <button id="next" onclick="next()">›</button>
            </div>

            <!-- カレンダー -->
            <div id="calendar"></div>
          </div>
        </div>

        <div class="modal-body">
          <div class="modal-left">
            <section class="modal-date">
              <label for="data" class="modal-date-title modal-title">学習日</label>
              <input type="text" id="data" class="modal-date-textbox modal-textbox">
            </section>
            <section class="modal-content">
              <h1 class="modal-content-title modal-title">学習コンテンツ(複数選択可)</h1>
              <div class="modal-content-choice">
                <div class="modal-checkbox-body">
                  <label for="content-select-1" class="modal-checkbox-text">
                    <input type="checkbox" id="content-select-1" class="modal-checkbox">N予備校
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="content-select-2" class="modal-checkbox-text">
                    <input type="checkbox" id="content-select-2" class="modal-checkbox">ドットインストール
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="content-select-3" class="modal-checkbox-text">
                    <input type="checkbox" id="content-select-3" class="modal-checkbox">POSSE課題
                  </label>
                </div>
              </div>
            </section>
            <section class="modal-lang">
              <h1 class="modal-lang-title modal-title">学習言語(複数選択可)</h1>
              <div class="modal-lang-choice">
                <div class="modal-checkbox-body">
                  <label for="lang-select-1" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-1" class="modal-checkbox">HTML
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-2" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-2" class="modal-checkbox">CSS
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-3" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-3" class="modal-checkbox">JavaScript
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-4" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-4" class="modal-checkbox">PHP
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-5" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-5" class="modal-checkbox">Laravel
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-6" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-6" class="modal-checkbox">SQL
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-7" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-7" class="modal-checkbox">SHELL
                  </label>
                </div>
                <div class="modal-checkbox-body">
                  <label for="lang-select-8" class="modal-checkbox-text">
                    <input type="checkbox" id="lang-select-8" class="modal-checkbox">情報システム基礎(その他)
                  </label>
                </div>
              </div>
            </section>
          </div>
          <div class="modal-right">
            <section class="modal-time">
              <label for="time" class="modal-time-title modal-title">学習時間</label>
              <input type="number" class="modal-time-textbox modal-textbox">
            </section>
            <section class="modal-twitter-comment">
              <label for="twitter" class="modal-twitter-comment-title modal-title">Twitter用コメント</label>
              <textarea id="modal-twitter-comment-textbox"
                class="modal-twitter-comment-textbox modal-textbox"></textarea>
              <!-- <textarea rows="12" cols="33" id="modal-twitter-comment-textbox"
                class="modal-twitter-comment-textbox modal-textbox"></textarea> -->
            </section>
            <section class="modal-twitter-share">
              <label for="twitter-share" class="modal-checkbox-text modal-twitter-share-checkbox-text">
                <input type="checkbox" id="twitter-share" class="modal-checkbox" checked>Twitterにシェアする
              </label>
            </section>
            <div>
              <button class="modal-button">記録・投稿</button>
            </div>
          </div>
        </div>
        <div class="loader modal-off">Loading...</div>
        <div class="modal-complete modal-off">
          <div class="modal-complete-check">
            <div class="modal-complete-check-text">AWESOME!</div>
            <div class="modal-complete-check-body"> <i class="modal-complete-check-img"></i></div>
            <div class="modal-complete-text">
              記録・投稿<br> 完了しました
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- モーダルおわり -->

  </main>
  <footer>
    <span>
      <button class="footer-button">記録・投稿</button>
    </span>
    <div class="footer-body">
      <div class="footer-date-before"></div>
      <div class="footer-date"><? echo date('Y年m月'); ?></div>
      <div class="footer-date-after"></div>
    </div>
  </footer>
</body>

<!-- ここからchart.js -->

<script>
  'use strict';

window.onload = function () {
  var contextBar = document.querySelector('#graph-bar').getContext('2d');
  
  var barDatasets = [{
  // label: '',
  // data: [3, 4, 1, 3, 3, 4, 6, 7, 2, 4, 2, 5, 7, 8, 6, 4, 5, 1, 1, 2, 4, 3, 5, 2, 6, 8, 8, 3, 1, 4,],
  data: [<?php
    foreach($month_hours as $arr) {
      echo $arr["sum(hour)"] . ",";
    }
    ?>],  //sqlにカレンダー作ってガッチャンコする？　https://ja.stackoverflow.com/questions/12597/sql%E3%81%A7%E7%84%A1%E3%81%84%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%95%E3%81%9B%E3%81%9F%E3%81%84 、 https://lightgauge.net/database/mysql/5402/
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
      // labels: ['', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24', '', '26', '', '28', '', '30',],
      labels: [<?php
        foreach($month_hours as $arr){
          if((int) $arr["SUBSTRING(date, 9, 2)"] % 2 == 1) {
            echo "'',";
          } else {
            if($arr["SUBSTRING(date, 9, 2)"] < 10){
              echo "'" . (int) substr($arr["SUBSTRING(date, 9, 2)"], 1, 1) . "'" . ",";
            } else {
              echo "'" . (int) $arr['SUBSTRING(date, 9, 2)'] . "'" . ",";
            }
          }
        }
        ?>],
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
      responsive: true,
      animation: false,
      maintainAspectRatio: true,
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
      labels: [<?php
    foreach($contents as $arr) {
      echo "'" . $arr["content"] . "'" . ",";
    }
    ?>],
      datasets: [{
        data: [<?php
    foreach($contents as $arr) {
      echo (int) $arr["sum(hour)"] . ",";
    }
    ?>],
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
      responsive: true,
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
      labels: [<?php
    foreach($languages as $arr) {
      echo "'" . $arr["language"] . "'" . ",";
    }
    ?>],
      datasets: [{
        data: [<?php
    foreach($languages as $arr) {
      echo $arr["sum(hour)"] . ",";
    }
    ?>],
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
      responsive: true,
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

// jsonと格闘
  // fetch('./data.json')
  // .then(response => {
  //   return response.json();
  // })
  // .then(data => {
  //   data.forEach((v) => {
  //     console.log(v.time + ",");
  //   })
  // })
</script>

</html>