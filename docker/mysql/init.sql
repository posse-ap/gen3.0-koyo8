CREATE DATABASE IF NOT EXISTS web-app;
USE web-app;

CREATE TABLE times (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
  date date COMMENT '学習日',
  hour INT COMMENT '学習時間'
);

CREATE TABLE study_contents (
  id INT AUTO_INCREMENT PRIMARY KEY 'ID',
  times_id INT COMMENT 'times_id',
  content VARCHAR(255) COMMENT 'コンテンツ',
  FOREIGN KEY (`times_id`) REFERENCES order(`id`)
);

CREATE TABLE study_languages (
  id INT AUTO_INCREMENT PRIMARY KEY 'ID',
  times_id INT COMMENT 'times_id',
  language VARCHAR(255) COMMENT '言語',
  FOREIGN KEY (`times_id`) REFERENCES order(`id`)
);

INSERT INTO `times` VALUES 
(1, '2023-03-11', 3),
(2, '2023-03-12', 4),
(3, '2023-03-12', 2),
(4, '2023-03-14', 6)

INSERT INTO `study_contents` VALUE 
(1, 1, 'N予備校'),
(2, 1, 'ドットインストール'),
(3, 1, 'POSSE課題'),
(4, 2, 'N予備校'),
(5, 3, 'N予備校'),
(6, 4, 'POSSE課題')

INSERT INTO `study_languages` VALUE 
(1, 1, 'HTML'),
(2, 1, 'JavaScript'),
(3, 1, 'CSS'),
(4, 2, 'PHP'),
(5, 3, 'JavaScript'),
(6, 4, '情報システム基礎(その他)')