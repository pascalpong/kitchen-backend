/*
  Warnings:

  - You are about to drop the column `Users` on the `lot` table. All the data in the column will be lost.
  - You are about to drop the column `orders` on the `lot` table. All the data in the column will be lost.
  - You are about to drop the column `lotId` on the `order` table. All the data in the column will be lost.
  - Added the required column `name` to the `Lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_lotId_fkey`;

-- AlterTable
ALTER TABLE `lot` DROP COLUMN `Users`,
    DROP COLUMN `orders`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `lotId`,
    ADD COLUMN `billId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Bill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orders` JSON NOT NULL,
    `status` VARCHAR(191) NULL,
    `people` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `lotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_lotId_fkey` FOREIGN KEY (`lotId`) REFERENCES `Lot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
