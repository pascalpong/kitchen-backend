-- AlterTable
ALTER TABLE `admin` ADD COLUMN `secretKeys` JSON NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `secretKeys` JSON NULL;
