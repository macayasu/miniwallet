-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2022 at 04:15 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `julo`
--

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `deposit_id` text NOT NULL,
  `amount` int(100) NOT NULL,
  `reference_id` varchar(255) NOT NULL,
  `deposit_by` text NOT NULL,
  `deposit_at` timestamp NULL DEFAULT NULL,
  `wallet_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`deposit_id`, `amount`, `reference_id`, `deposit_by`, `deposit_at`, `wallet_id`) VALUES
('ea0212d3-abd6-406f-8c67-868e814a2433', 100000, '50535246-dcb2-4929-8cc9-004ea06f5241', '526ea8b2-428e-403b-b9fd-f10972e0d6fe', '2022-08-24 13:50:07', '6ef31ed3-f396-4b6c-8049-674ddede1b16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `customer_xid` text NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`customer_xid`, `token`) VALUES
('ea0212d3-abd6-406f-8c67-868e814a2436', '6b3f7dc70abe8aed3e56658b86fa508b472bf238');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id_wallet` text NOT NULL,
  `customer_xid` text NOT NULL,
  `owned_by` text NOT NULL,
  `balance` int(100) NOT NULL,
  `enabled` enum('True','False','','') NOT NULL DEFAULT 'False',
  `enabled_at` timestamp NULL DEFAULT NULL,
  `disabled_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id_wallet`, `customer_xid`, `owned_by`, `balance`, `enabled`, `enabled_at`, `disabled_at`) VALUES
('6ef31ed3-f396-4b6c-8049-674ddede1b16', 'ea0212d3-abd6-406f-8c67-868e814a2436', 'c4d7d61f-b702-44a8-af97-5dbdafa96551', 260000, 'False', '2022-08-24 14:13:05', '2022-08-24 14:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `withdraw_id` text NOT NULL,
  `amount` int(100) NOT NULL,
  `reference_id` varchar(255) NOT NULL,
  `withdrawn_by` text NOT NULL,
  `withdrawn_at` timestamp NULL DEFAULT NULL,
  `wallet_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `withdraw`
--

INSERT INTO `withdraw` (`withdraw_id`, `amount`, `reference_id`, `withdrawn_by`, `withdrawn_at`, `wallet_id`) VALUES
('ea0212d3-abd6-406f-8c67-868e814a2433', 60000, '4b01c9bb-3acd-47dc-87db-d9ac483d20b2', '526ea8b2-428e-403b-b9fd-f10972e0d6fe', '2022-08-24 14:00:59', '6ef31ed3-f396-4b6c-8049-674ddede1b16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`reference_id`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`reference_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
