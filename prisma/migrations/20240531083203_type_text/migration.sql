-- AlterTable
ALTER TABLE `admin` ADD COLUMN `secretKey` VARCHAR(191) NULL,
    MODIFY `refreshToken` TEXT NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `secretKey` VARCHAR(191) NULL,
    MODIFY `refreshToken` TEXT NULL;
