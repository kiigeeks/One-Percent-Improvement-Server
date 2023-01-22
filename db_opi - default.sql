-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Waktu pembuatan: 22 Jan 2023 pada 13.36
-- Versi server: 5.7.34
-- Versi PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_opi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Broadcasts`
--

CREATE TABLE `Broadcasts` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `flyer` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Broadcasts`
--

INSERT INTO `Broadcasts` (`id`, `uuid`, `title`, `desc`, `flyer`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '09e9982a-99fe-4b2f-8e96-bf23a9b7bb5c', 'Event', 'Example Event ', 'broadcast/fb9dfd2062c3608e398986262785f7ea.png', 'active', '2023-01-22 12:14:31', '2023-01-22 12:27:25'),
(2, '98211ea0-38ce-4c70-bca0-c65b05f5db6f', 'Event2', 'Test Event 2 without image', NULL, 'inactive', '2023-01-22 12:23:05', '2023-01-22 12:24:52'),
(3, '8ae131dc-9089-4db6-9616-262e0966ad2a', 'Event3', 'Test Event3 without image', NULL, 'inactive', '2023-01-22 12:24:44', '2023-01-22 12:27:23'),
(4, '4286a2bb-e242-4c44-9812-b52d1c5d27df', 'event4', 'test event4 without image', NULL, 'inactive', '2023-01-22 12:25:56', '2023-01-22 12:27:23'),
(5, '09ab376e-92ce-4625-9753-e9dd18b0d4a3', 'event5', 'test event5 without image', NULL, 'inactive', '2023-01-22 12:27:23', '2023-01-22 12:27:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Divisions`
--

CREATE TABLE `Divisions` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `statusActive` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Divisions`
--

INSERT INTO `Divisions` (`id`, `uuid`, `name`, `statusActive`, `createdAt`, `updatedAt`) VALUES
(1, '20036c62-939c-4c1c-9cd9-075dab5d2cee', 'Human Capital', 'active', '2023-01-22 11:06:56', '2023-01-22 11:06:56'),
(14, '48203407-0682-4c4b-97d1-5b2163635e6b', 'Marketing', 'active', '2023-01-22 11:45:19', '2023-01-22 11:45:19'),
(15, '41eddc06-fb75-4df0-b0ad-3fe7912c2920', 'Produksi', 'active', '2023-01-22 11:45:27', '2023-01-22 11:45:27'),
(16, '8880f213-9ebe-4976-97be-8888cf7b0086', 'Multimedia', 'active', '2023-01-22 11:45:33', '2023-01-22 11:45:33'),
(17, 'eeb00c55-65f7-4789-8835-7a1e3b73abd3', 'General Affair', 'inactive', '2023-01-22 11:46:07', '2023-01-22 11:46:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Improvements`
--

CREATE TABLE `Improvements` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('pending','done','progress') NOT NULL DEFAULT 'progress',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Improvements`
--

INSERT INTO `Improvements` (`id`, `uuid`, `message`, `note`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(2, '33d03f49-b4e2-47b3-abf3-a418b9971d36', 'test imp', NULL, 1, 'progress', '2023-01-22 11:36:02', '2023-01-22 11:36:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Motivations`
--

CREATE TABLE `Motivations` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Motivations`
--

INSERT INTO `Motivations` (`id`, `uuid`, `message`, `author`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'e55c136e-e493-4a8e-b90e-27b4e30249ba', 'Success is not final, failure is not fatal, It is the courage to continue that counts.', 'Winston S. Churchill', 'active', '2023-01-22 11:53:02', '2023-01-22 11:53:24'),
(2, '6beb498f-1c14-466a-a1a5-164d90646e19', 'I never dreamed about success. I worked for it.', 'Estée Lauder', 'active', '2023-01-22 11:54:04', '2023-01-22 11:54:04'),
(3, '1bac59e5-e2b0-4761-99f8-164354981e31', 'Don’t let yesterday take up too much of today.', 'Will Rogers', 'active', '2023-01-22 11:55:09', '2023-01-22 11:55:09'),
(4, 'c842274d-fb45-471d-bf91-24e3511106fc', 'Either you run the day or the day runs you.', 'Jim Rohn', 'active', '2023-01-22 11:55:46', '2023-01-22 11:55:46'),
(5, '1651bd87-d8c5-40e8-85e9-709da6993337', 'It’s not about better time management. It’s about better life management', 'Alexandra of The Productivity Zone', 'active', '2023-01-22 11:56:05', '2023-01-22 11:56:05'),
(6, '3a53701f-f580-48f7-a10e-3e3341e76ad4', 'People say nothing is impossible, but I do nothing every day.', 'Winnie the Pooh', 'active', '2023-01-22 11:57:00', '2023-01-22 11:57:00'),
(7, '3f1ac871-a181-40d6-9a05-03b4a7d9b9bc', 'Talent wins games, but teamwork and intelligence win championships.', 'Michael Jordan', 'active', '2023-01-22 11:57:40', '2023-01-22 11:57:40'),
(8, '8b36ea50-a2bb-4234-9025-242cebf4a601', 'Opportunities don\'t happen, you create them.', 'Chris Grosser', 'active', '2023-01-22 11:58:07', '2023-01-22 11:58:07'),
(9, '648346d3-4236-437a-8c97-a6855f4f1ea8', 'Inspiration does exist, but it must find you working.', 'Pablo Picasso', 'active', '2023-01-22 11:58:53', '2023-01-22 11:58:53'),
(10, 'de198c79-0fb8-4804-a866-12e127f9bb19', 'Start where you are. Use what you have. Do what you can.', 'Arthur Ashe', 'active', '2023-01-22 12:00:25', '2023-01-22 12:00:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Sessions`
--

CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Sessions`
--

INSERT INTO `Sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('2CQx24pz8jg91IcXbIS6oUmpvbjFCm5f', '2023-01-23 12:27:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 12:27:25', '2023-01-22 12:27:25'),
('3BXGjiJFUMM8MHdUic9tIj2CNFEmJQH2', '2023-01-23 11:30:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:30:12', '2023-01-22 11:30:12'),
('4joOwS1ay24-hMvcdV29_L05g8hZbFtG', '2023-01-23 11:53:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:53:24', '2023-01-22 11:53:24'),
('5cx5UrRL8CBmW8fQif9fkQ35xyQhj7zM', '2023-01-23 12:00:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 12:00:25', '2023-01-22 12:00:25'),
('6dS39OM4_3BfK1FZHODWOJ8hdvv0OUrR', '2023-01-23 11:56:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:56:05', '2023-01-22 11:56:05'),
('6f9IVEz8dyrRNf4bXkpNo4twXHKGD_zh', '2023-01-23 11:53:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:53:02', '2023-01-22 11:53:02'),
('8Q0DayQvRbM9zJaKTifOLaZLG8vkdQuP', '2023-01-23 11:07:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:07:05', '2023-01-22 11:07:05'),
('8Y4WZwmv33DZZDIvvMVyXsnxCfUwB0tt', '2023-01-23 11:57:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:57:00', '2023-01-22 11:57:00'),
('9Ua2lKqg4GyM-KCunPRN6A5gdm1e-40b', '2023-01-23 11:07:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:07:05', '2023-01-22 11:07:05'),
('aNZmRxT9VeLo40K8Q9XDuWB6sdTJse8M', '2023-01-23 11:07:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:07:10', '2023-01-22 11:07:10'),
('CpuK-osJTzxzeBVwFgdH4PXJTLdx6mwx', '2023-01-23 11:36:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:36:09', '2023-01-22 11:36:09'),
('ELd8d0e62IEkJtEuGgfsomXOgv54nxqU', '2023-01-23 11:36:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:36:02', '2023-01-22 11:36:02'),
('EpmhPIHsmNOiaB5gf0mKlrz7qUpOV84S', '2023-01-23 11:34:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:34:02', '2023-01-22 11:34:02'),
('GwwyNT7kygx2U1HBQOhdNqqK5HxBOJ19', '2023-01-23 11:45:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:45:33', '2023-01-22 11:45:33'),
('hf1fKO7cqgKH6XyshOpxV1azRFNgM4UC', '2023-01-23 11:07:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:07:05', '2023-01-22 11:07:05'),
('ibUo1U7ENsK7rML9MnA2XZXyYnFiYpzn', '2023-01-23 11:54:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:54:04', '2023-01-22 11:54:04'),
('jX8mVqSRvvVbhmvG_i1CD7rBqrOLam2z', '2023-01-23 11:32:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:32:03', '2023-01-22 11:32:03'),
('KCrx9V48E2wJMKT_b6M2PFssAxixuuKL', '2023-01-23 11:28:59', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:28:59', '2023-01-22 11:28:59'),
('kdTzebuueLmk5X1e_DZl48BQXEz0r5Os', '2023-01-23 11:27:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:27:34', '2023-01-22 11:27:34'),
('nIgxCwY2Ir2UosKVYUBYrNqIuSmpm1zg', '2023-01-23 13:34:23', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userUUID\":\"726ae319-6d41-4853-b406-fc8bd4dc71bd\",\"userId\":1}', '2023-01-22 11:35:01', '2023-01-22 13:34:23'),
('oeaOL36ic6sgrcHWO7falxQGTpzcL4JP', '2023-01-23 11:26:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:26:40', '2023-01-22 11:26:40'),
('Of3qb3HQFE6pM5rFAUTloFQaB37Om3MW', '2023-01-23 11:58:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:58:53', '2023-01-22 11:58:53'),
('oreKCQo1i7RguIskPTaTCO4apMOiHj47', '2023-01-23 12:24:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 12:24:49', '2023-01-22 12:24:49'),
('oUlWY1bjWpcVWhk3SSfjs7Z5fCRMffv7', '2023-01-23 11:35:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:35:45', '2023-01-22 11:35:45'),
('oyupqAK4AdE5IpQSplZPSeFz3ihz2RA8', '2023-01-23 11:35:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:35:07', '2023-01-22 11:35:07'),
('PSiUgwZSpafmweHV0sQFo6SDyWbSrNKu', '2023-01-23 11:34:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:34:25', '2023-01-22 11:34:25'),
('pxxBIrXIU13zeqFX1Uemxf-0AM2B7XfK', '2023-01-23 11:31:27', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:31:27', '2023-01-22 11:31:27'),
('pzRWIxU2z1M78u9qmvWqheknODepGakY', '2023-01-23 11:55:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:55:09', '2023-01-22 11:55:09'),
('r4-dIbC8BC0-8tTk4PSOyQZ-OP7rEeSl', '2023-01-23 11:57:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:57:40', '2023-01-22 11:57:40'),
('RJlOAVW5LuZ8iifrQ5FCORqBHXeVZuLG', '2023-01-23 11:58:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:58:07', '2023-01-22 11:58:07'),
('RzcjR3ZD4-KO5UGexOEA4ZbEJzuJv3-i', '2023-01-23 11:55:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:55:46', '2023-01-22 11:55:46'),
('y9XJ1cFRtsFhX-4c7u8_uPFF7r4DdJN3', '2023-01-23 11:33:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:33:37', '2023-01-22 11:33:37'),
('yNbx3QhspRexqHU0umYSBg95a0zLkr4X', '2023-01-23 11:45:27', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:45:27', '2023-01-22 11:45:27'),
('YnCZbPhDQh0AbvqRqKqTHaDrOHJWfVx5', '2023-01-23 11:07:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:07:05', '2023-01-22 11:07:05'),
('YYkmILi35wDvch6EuPLmHxgp2eqetjf8', '2023-01-23 11:35:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:35:01', '2023-01-22 11:35:01'),
('z9Rvcrz1uKM7XdJmyhltjmV5ERFnITPP', '2023-01-23 11:45:19', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:45:19', '2023-01-22 11:45:19'),
('_M0LxztHX8RK95bqXTzEbwkQFuDdlUAL', '2023-01-23 11:46:07', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 11:46:07', '2023-01-22 11:46:07'),
('_z3dFk9WDz10vCOHDcSLGtzen4uXsbXL', '2023-01-23 12:20:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-01-22 12:20:18', '2023-01-22 12:20:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `divisionId` int(11) NOT NULL,
  `role` enum('admin','employee') DEFAULT 'employee',
  `statusActive` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data untuk tabel `Users`
--

INSERT INTO `Users` (`id`, `uuid`, `fullname`, `username`, `password`, `photo`, `cover`, `divisionId`, `role`, `statusActive`, `createdAt`, `updatedAt`) VALUES
(1, '726ae319-6d41-4853-b406-fc8bd4dc71bd', 'admin', 'admin', '$2b$10$6kW38pgAGVBq1m/K5VK0yuTKEDAFmNlxVQcW6Kw7V3l6P7MaRUc62', NULL, NULL, 1, 'admin', 'active', '2023-01-22 11:06:56', '2023-01-22 11:06:56'),
(2, '044b302f-8bc3-41ca-acbf-56c1b174a608', 'guest1', 'guest1', '$2b$10$wuxMUrFG29pHaBAcOScVlO0mmebBNHlIVYZhtSF6mGE/cQ0VJkbVy', NULL, NULL, 14, 'employee', 'active', '2023-01-22 12:20:18', '2023-01-22 12:20:18');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Broadcasts`
--
ALTER TABLE `Broadcasts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indeks untuk tabel `Divisions`
--
ALTER TABLE `Divisions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `Divisions_name_unique` (`name`);

--
-- Indeks untuk tabel `Improvements`
--
ALTER TABLE `Improvements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `Motivations`
--
ALTER TABLE `Motivations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indeks untuk tabel `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `Users_username_unique` (`username`),
  ADD KEY `divisionId` (`divisionId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Broadcasts`
--
ALTER TABLE `Broadcasts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `Divisions`
--
ALTER TABLE `Divisions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `Improvements`
--
ALTER TABLE `Improvements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `Motivations`
--
ALTER TABLE `Motivations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Improvements`
--
ALTER TABLE `Improvements`
  ADD CONSTRAINT `improvements_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`divisionId`) REFERENCES `Divisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
