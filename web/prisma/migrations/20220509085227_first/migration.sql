-- CreateTable
CREATE TABLE `geofence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `location` VARCHAR(150) NULL,
    `artist` VARCHAR(255) NULL,
    `technique` VARCHAR(50) NULL,
    `size` VARCHAR(20) NULL,
    `collection` VARCHAR(150) NULL,
    `route_id` INTEGER NOT NULL,
    `route_user_id` INTEGER NOT NULL,

    INDEX `fk_geofence_route_id`(`route_id`, `route_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` LONGTEXT NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NOT NULL,

    INDEX `fk_route_user_idx`(`user_id`),
    PRIMARY KEY (`id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `geofence` ADD CONSTRAINT `fk_geofence_route` FOREIGN KEY (`route_id`, `route_user_id`) REFERENCES `route`(`id`, `user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `route` ADD CONSTRAINT `fk_route_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
