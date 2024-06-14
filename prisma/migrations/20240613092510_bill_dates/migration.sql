/*
  Warnings:

  - Made the column `code` on table `bill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bill` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `code` VARCHAR(191) NOT NULL;
