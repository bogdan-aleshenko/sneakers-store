-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Лют 26 2024 р., 14:15
-- Версія сервера: 8.0.30
-- Версія PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `gold_star`
--

-- --------------------------------------------------------

--
-- Структура таблиці `admin`
--

CREATE TABLE `admin` (
  `login` varchar(50) COLLATE utf32_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `goods`
--

CREATE TABLE `goods` (
  `id` int NOT NULL,
  `path` varchar(255) COLLATE utf32_unicode_ci NOT NULL,
  `color` varchar(10) COLLATE utf32_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  `alt` text COLLATE utf32_unicode_ci,
  `text_rating` text COLLATE utf32_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf32_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Дамп даних таблиці `goods`
--

INSERT INTO `goods` (`id`, `path`, `color`, `rating`, `alt`, `text_rating`, `name`, `price`) VALUES
(1, 'Red.png', '#cb493e', 4.5, NULL, 'Premium running shoes specially made to deliver high perfomance. Text for red', 'Red Wobat', '120.00'),
(2, 'Pink.png', '#A82462', 4, NULL, 'Premium running shoes specially made to deliver high perfomance.', 'Pink Wobat', '100.00'),
(3, 'Blue.png', '#2B64AD', 3.2, NULL, 'Premium running shoes specially made to deliver high perfomance. Text for blue', 'Blue Wobat', '150.00'),
(4, 'Green.png', '#47B558', 3, NULL, 'Premium running shoes specially made to deliver high perfomance.', 'Green  Wobat', '122.00'),
(5, 'Blue light.png', '#337FA4', 4, NULL, 'Premium running shoes specially made to deliver high perfomance.', 'Light Wobat', '99.00'),
(6, 'Maroon.png', '#9E0D04', 4, NULL, 'Premium running shoes specially made to deliver high perfomance.', 'Maroon Wobat', '200.00');

-- --------------------------------------------------------

--
-- Структура таблиці `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` int NOT NULL,
  `id_goods` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(50) COLLATE utf32_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf32_unicode_ci NOT NULL,
  `repeat_password` varchar(50) COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_goods` (`id_goods`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Індекси таблиці `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблиці `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`id_goods`) REFERENCES `goods` (`id`),
  ADD CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
