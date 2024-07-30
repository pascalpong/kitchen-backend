/*
  Warnings:

  - You are about to drop the column `picture` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `picture`,
    ADD COLUMN `image` VARCHAR(191) NULL;
