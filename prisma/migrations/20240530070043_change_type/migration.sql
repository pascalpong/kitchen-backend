/*
  Warnings:

  - You are about to alter the column `refreshToken` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `refreshToken` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `refreshToken` JSON NULL;

-- AlterTable
ALTER TABLE `employee` MODIFY `refreshToken` JSON NULL;
