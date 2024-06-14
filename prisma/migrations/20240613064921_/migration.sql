/*
  Warnings:

  - You are about to drop the column `orders` on the `bill` table. All the data in the column will be lost.
  - Added the required column `code` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `orders`,
    ADD COLUMN `code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lot` ADD COLUMN `code` VARCHAR(191) NOT NULL;
