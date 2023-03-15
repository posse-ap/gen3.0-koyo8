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

// var_dump($month);

$sql = 'SELECT sum(hour) FROM times WHERE date LIKE :date';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':date', $month . '%');
$stmt->execute();
$month_hour = $stmt->fetch();

$sql = 'SELECT sum(hour) FROM times';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$total_hour = $stmt->fetch();

?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>top-page</title>
  <link rel="stylesheet" href="./reset1.css">
  <link rel="stylesheet" href="./style.css">
  <script src="./script.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
  <script src="../chartjs-plugin-labels-master/src/chartjs-plugin-labels.js"></script>
  <script src="./chart.js" defer></script>
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
            <? if(isset($today_hour)) {
              print $today_hour["sum(hour)"];
            } else {
              print "0";
            } ?>
          </div>
          <div class="time-sub">hour</div>
        </div>
        <div class="time-month time-box">
          <div class="time-title">Month</div>
          <div class="time-body">
          <? if(isset($month_hour)) {
              print $month_hour["sum(hour)"];
            } else {
              print "0";
            } ?>
          </div>
          <div class="time-sub">hour</div>
        </div>
        <div class="time-total time-box">
          <div class="time-title">Total</div>
          <div class="time-body">
          <? if(isset($month_hour)) {
              print $total_hour["sum(hour)"];
            } else {
              print "0";
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
      <div class="footer-date">2020年10月</div>
      <div class="footer-date-after"></div>
    </div>
  </footer>
</body>

</html>