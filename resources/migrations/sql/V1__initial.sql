

-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `category` (
  `id` CHAR(36) NOT NULL,
  `label` VARCHAR(60) NOT NULL,
  `urn` VARCHAR(60) NULL,
  `description` TEXT NULL,
  `parent_id` CHAR(36) NULL,
  `store_id` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category_category1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_category_category1_idx` ON `category` (`parent_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `category_urn_store_id_UNIQUE` ON `category` (`urn` ASC, `store_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
  `id` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `title` VARCHAR(120) NULL,
  `description` TEXT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `category_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `product_id_store_id_UNIQUE` ON `product` (`id` ASC, `store_id` ASC) VISIBLE;

CREATE INDEX `fk_product_category1_idx` ON `product` (`category_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `variation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `variation` (
  `sku` VARCHAR(80) NOT NULL,
  `width` BIGINT NULL,
  `length` BIGINT NULL,
  `height` BIGINT NULL,
  `measures_unit` VARCHAR(2) NULL DEFAULT 'CM',
  `weight` BIGINT NULL,
  `weight_unit` VARCHAR(2) NULL DEFAULT 'G',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `product_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`sku`),
  CONSTRAINT `fk_variation_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_variation_product_id_idx` ON `variation` (`product_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `catalog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog` (
  `id` CHAR(36) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `catalog_id_store_id_UNIQUE` ON `catalog` (`id` ASC, `store_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attribute` (
  `id` CHAR(36) NOT NULL,
  `label` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `values` JSON NULL,
  `scope` VARCHAR(45) NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `attribute_id_store_id_UNIQUE` ON `attribute` (`id` ASC, `store_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `image` (
  `id` CHAR(36) NOT NULL,
  `url` TEXT NULL,
  `position` INT NULL,
  `variation_sku` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_image_variation_sku`
    FOREIGN KEY (`variation_sku`)
    REFERENCES `variation` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_image_variation_sku_idx` ON `image` (`variation_sku` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `product_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_attribute` (
  `attributes_id` CHAR(36) NOT NULL,
  `product_id` VARCHAR(80) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`attributes_id`, `product_id`),
  CONSTRAINT `fk_attributes_has_product_attributes1`
    FOREIGN KEY (`attributes_id`)
    REFERENCES `attribute` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attributes_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_attributes_has_product_product1_idx` ON `product_attribute` (`product_id` ASC) VISIBLE;

CREATE INDEX `fk_attributes_has_product_attributes1_idx` ON `product_attribute` (`attributes_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `variation_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `variation_attribute` (
  `attributes_id` CHAR(36) NOT NULL,
  `variation_sku` VARCHAR(80) NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`attributes_id`, `variation_sku`),
  CONSTRAINT `fk_attributes_has_variation_attributes1`
    FOREIGN KEY (`attributes_id`)
    REFERENCES `attribute` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attributes_has_variation_variation1`
    FOREIGN KEY (`variation_sku`)
    REFERENCES `variation` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_attributes_has_variation_variation1_idx` ON `variation_attribute` (`variation_sku` ASC) VISIBLE;

CREATE INDEX `fk_attributes_has_variation_attributes1_idx` ON `variation_attribute` (`attributes_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `catalog_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog_product` (
  `catalog_id` CHAR(36) NOT NULL,
  `product_id` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`catalog_id`, `product_id`),
  CONSTRAINT `fk_catalog_has_product_catalog1`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `catalog` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_catalog_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_catalog_has_product_product1_idx` ON `catalog_product` (`product_id` ASC) VISIBLE;

CREATE INDEX `fk_catalog_has_product_catalog1_idx` ON `catalog_product` (`catalog_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaign` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `campaign_id_store_id_UNIQUE` ON `campaign` (`id` ASC, `store_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `price` (
  `id` CHAR(36) NOT NULL,
  `list` BIGINT NULL,
  `sale` BIGINT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `variation_sku` VARCHAR(80) NOT NULL,
  `campaign_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_price_variation1`
    FOREIGN KEY (`variation_sku`)
    REFERENCES `variation` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_price_campaign1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaign` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_price_variation1_idx` ON `price` (`variation_sku` ASC) VISIBLE;

CREATE INDEX `fk_price_campaign1_idx` ON `price` (`campaign_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `warehouse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `warehouse` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address_zip_code` VARCHAR(8) NULL,
  `address_state` CHAR(2) NULL,
  `address_city` VARCHAR(45) NULL,
  `address_district` VARCHAR(120) NULL,
  `address_street` VARCHAR(200) NULL,
  `address_number` VARCHAR(45) NULL,
  `address_complement` VARCHAR(200) NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `warehouse_id_store_id_UNIQUE` ON `warehouse` (`id` ASC, `store_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock` (
  `variation_sku` VARCHAR(80) NOT NULL,
  `warehouse_id` CHAR(36) NOT NULL,
  `quantity` BIGINT NOT NULL,
  PRIMARY KEY (`variation_sku`, `warehouse_id`),
  CONSTRAINT `fk_variation_has_warehouse_variation1`
    FOREIGN KEY (`variation_sku`)
    REFERENCES `variation` (`sku`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_variation_has_warehouse_warehouse1`
    FOREIGN KEY (`warehouse_id`)
    REFERENCES `warehouse` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_variation_has_warehouse_warehouse1_idx` ON `stock` (`warehouse_id` ASC) VISIBLE;

CREATE INDEX `fk_variation_has_warehouse_variation1_idx` ON `stock` (`variation_sku` ASC) VISIBLE;
