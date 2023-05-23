-- CreateTable
CREATE TABLE `Mst_supplier` (
    `id_supplier` INTEGER NOT NULL AUTO_INCREMENT,
    `name_supplier` VARCHAR(191) NOT NULL,
    `address_supplier` VARCHAR(191) NOT NULL,
    `phone_supplier` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_supplier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mst_rack` (
    `id_rack` INTEGER NOT NULL AUTO_INCREMENT,
    `rack_no` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rack`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mst_part` (
    `part_no` INTEGER NOT NULL AUTO_INCREMENT,
    `part_name` VARCHAR(191) NOT NULL,
    `part_uniq` VARCHAR(191) NOT NULL,
    `mst_rackId` INTEGER NOT NULL,

    PRIMARY KEY (`part_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tb_wo` (
    `id_wo` INTEGER NOT NULL AUTO_INCREMENT,
    `qty_kbn` INTEGER NOT NULL,
    `qty_order` INTEGER NOT NULL,
    `date_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mst_partId` INTEGER NOT NULL,
    `mst_supplierId` INTEGER NOT NULL,

    PRIMARY KEY (`id_wo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tb_do` (
    `id_do` INTEGER NOT NULL AUTO_INCREMENT,
    `qty_kbn` INTEGER NOT NULL,
    `qty_order` INTEGER NOT NULL,
    `no_truck` VARCHAR(191) NOT NULL,
    `date_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mst_partId` INTEGER NOT NULL,
    `mst_supplierId` INTEGER NOT NULL,

    PRIMARY KEY (`id_do`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mst_part` ADD CONSTRAINT `Mst_part_mst_rackId_fkey` FOREIGN KEY (`mst_rackId`) REFERENCES `Mst_rack`(`id_rack`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tb_wo` ADD CONSTRAINT `Tb_wo_mst_partId_fkey` FOREIGN KEY (`mst_partId`) REFERENCES `Mst_part`(`part_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tb_wo` ADD CONSTRAINT `Tb_wo_mst_supplierId_fkey` FOREIGN KEY (`mst_supplierId`) REFERENCES `Mst_supplier`(`id_supplier`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tb_do` ADD CONSTRAINT `Tb_do_mst_partId_fkey` FOREIGN KEY (`mst_partId`) REFERENCES `Mst_part`(`part_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tb_do` ADD CONSTRAINT `Tb_do_mst_supplierId_fkey` FOREIGN KEY (`mst_supplierId`) REFERENCES `Mst_supplier`(`id_supplier`) ON DELETE RESTRICT ON UPDATE CASCADE;
