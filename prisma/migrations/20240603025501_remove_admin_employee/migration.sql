/*
  Warnings:

  - You are about to drop the column `adminId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `employees` on the `lot` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Users` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_adminId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `adminId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lot` DROP COLUMN `employees`,
    ADD COLUMN `Users` JSON NOT NULL;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `employee`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `photoURL` VARCHAR(191) NULL,
    `details` JSON NULL,
    `refreshToken` TEXT NULL,
    `publicKey` VARCHAR(191) NULL,
    `secretKey` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
