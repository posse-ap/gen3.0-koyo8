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
(1, '2022-03-11', 3),
(2, '2023-03-01', 4),
(3, '2023-03-02', 2),
(4, '2023-03-03', 7),
(5, '2023-03-04', 4),
(6, '2023-03-05', 2),
(7, '2023-03-06', 7),
(8, '2023-03-07', 4),
(9, '2023-03-08', 2),
(10, '2023-03-09', 7),
(11, '2023-03-10', 7),
(12, '2023-03-11', 4),
(13, '2023-03-12', 2),
(14, '2023-03-13', 7),
(15, '2023-03-14', 4),
(16, '2023-03-15', 2),
(17, '2023-03-16', 7),
(18, '2023-03-17', 4),
(19, '2023-03-18', 2),
(20, '2023-03-19', 7),
(21, '2023-03-19', 7),
(22, '2023-03-20', 7),
(23, '2023-03-21', 4),
(24, '2023-03-22', 2),
(25, '2023-03-23', 7),
(26, '2023-03-24', 4),
(27, '2023-03-25', 2),
(28, '2023-03-26', 7),
(29, '2023-03-27', 4),
(30, '2023-03-28', 2),
(31, '2023-03-29', 7),
(32, '2023-03-30', 7)

INSERT INTO `study_contents` VALUE 
(1, 1, 'N予備校'),
(2, 1, 'ドットインストール'),
(3, 2, 'POSSE課題'),
(4, 2, 'N予備校'),
(5, 3, 'N予備校'),
(6, 4, 'POSSE課題')

INSERT INTO `study_languages` VALUE 
(1, 1, 'HTML'),
(2, 1, 'JavaScript'),
(3, 2, 'CSS'),
(4, 2, 'PHP'),
(5, 3, 'JavaScript'),
(6, 4, '情報システム基礎(その他)')