/*
  Warnings:

  - You are about to drop the column `tokens` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `tokens` on the `employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `tokens`,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `tokens`,
    ADD COLUMN `refreshToken` VARCHAR(191) NULL;
