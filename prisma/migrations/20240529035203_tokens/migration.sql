-- AlterTable
ALTER TABLE `admin` ADD COLUMN `tokens` JSON NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `photoURL` VARCHAR(191) NULL,
    ADD COLUMN `tokens` JSON NULL;
