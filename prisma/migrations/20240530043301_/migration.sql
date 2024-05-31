/*
  Warnings:

  - You are about to drop the column `secretKeys` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `secretKeys` on the `employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `secretKeys`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `secretKeys`;
