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

CREATE INDEX `fk_category_category1_idx` ON `category` (`parent_id` ASC);

CREATE UNIQUE INDEX `category_urn_store_id_UNIQUE` ON `category` (`urn` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `brand` (
  `id` CHAR(36) NOT NULL,
  `label` VARCHAR(60) NOT NULL,
  `urn` VARCHAR(60) NULL,
  `description` TEXT NULL,
  `store_id` CHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `brand_urn_store_id_UNIQUE` ON `brand` (`urn` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
  `id` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `title` VARCHAR(120) NULL,
  `description` TEXT NULL,
  `template_variation` JSON NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `category_id` CHAR(36) NOT NULL,
  `brand_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`, `store_id`),
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_brand1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_product_category1_idx` ON `product` (`category_id` ASC);

CREATE INDEX `fk_product_brand1_idx` ON `product` (`brand_id` ASC);


-- -----------------------------------------------------
-- Table `variation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `variation` (
  `sku` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `width` BIGINT NULL,
  `length` BIGINT NULL,
  `height` BIGINT NULL,
  `measures_unit` VARCHAR(2) NULL DEFAULT 'CM',
  `weight` BIGINT NULL,
  `weight_unit` VARCHAR(2) NULL DEFAULT 'G',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `product_id` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`sku`, `store_id`),
  CONSTRAINT `fk_variation_product1`
    FOREIGN KEY (`product_id` , `store_id`)
    REFERENCES `product` (`id` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_variation_product1_idx` ON `variation` (`product_id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `catalog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog` (
  `id` CHAR(36) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `catalog_id_store_id_UNIQUE` ON `catalog` (`id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `specification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `specification` (
  `id` CHAR(36) NOT NULL,
  `label` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `values` JSON NULL,
  `scope` VARCHAR(45) NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `specification_id_store_id_UNIQUE` ON `specification` (`id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `image` (
  `id` CHAR(36) NOT NULL,
  `url` TEXT NULL,
  `position` INT NULL,
  `value` VARCHAR(250) NULL,
  `product_id` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_image_product1`
    FOREIGN KEY (`product_id` , `store_id`)
    REFERENCES `product` (`id` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_image_product1_idx` ON `image` (`product_id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `product_specification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_specification` (
  `specification_id` CHAR(36) NOT NULL,
  `product_id` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `value` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`specification_id`, `product_id`, `store_id`),
  CONSTRAINT `fk_attributes_has_product_attributes1`
    FOREIGN KEY (`specification_id`)
    REFERENCES `specification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_attribute_product1`
    FOREIGN KEY (`product_id` , `store_id`)
    REFERENCES `product` (`id` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_specification_product_attributes1_idx` ON `product_specification` (`specification_id` ASC);

CREATE INDEX `fk_product_specification_product1_idx` ON `product_specification` (`product_id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `variation_specification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `variation_specification` (
  `specification_id` CHAR(36) NOT NULL,
  `variation_sku` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `value` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`specification_id`, `variation_sku`, `store_id`),
  CONSTRAINT `fk_attributes_has_variation_attributes1`
    FOREIGN KEY (`specification_id`)
    REFERENCES `specification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_variation_attribute_variation1`
    FOREIGN KEY (`variation_sku` , `store_id`)
    REFERENCES `variation` (`sku` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_attributes_variation_attributes1_idx` ON `variation_specification` (`specification_id` ASC);

CREATE INDEX `fk_variation_attribute_variation1_idx` ON `variation_specification` (`variation_sku` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `catalog_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog_product` (
  `catalog_id` CHAR(36) NOT NULL,
  `product_id` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`catalog_id`, `product_id`, `store_id`),
  CONSTRAINT `fk_catalog_has_product_catalog1`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `catalog` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_catalog_product_product1`
    FOREIGN KEY (`product_id` , `store_id`)
    REFERENCES `product` (`id` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_catalog_has_product_catalog1_idx` ON `catalog_product` (`catalog_id` ASC);

CREATE INDEX `fk_catalog_product_product1_idx` ON `catalog_product` (`product_id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `campaign`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaign` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `campaign_id_store_id_UNIQUE` ON `campaign` (`id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `price` (
  `id` CHAR(36) NOT NULL,
  `list` BIGINT NULL,
  `sale` BIGINT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `campaign_id` CHAR(36) NOT NULL,
  `variation_sku` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_price_campaign1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaign` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_price_variation1`
    FOREIGN KEY (`variation_sku` , `store_id`)
    REFERENCES `variation` (`sku` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_price_campaign1_idx` ON `price` (`campaign_id` ASC);

CREATE INDEX `fk_price_variation1_idx` ON `price` (`variation_sku` ASC, `store_id` ASC);

CREATE UNIQUE INDEX `price_campaign_id_variation_sku_store_id_UNIQUE` ON `price` (`campaign_id` ASC, `variation_sku` ASC, `store_id` ASC);


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

CREATE UNIQUE INDEX `warehouse_id_store_id_UNIQUE` ON `warehouse` (`id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock` (
  `warehouse_id` CHAR(36) NOT NULL,
  `variation_sku` VARCHAR(80) NOT NULL,
  `store_id` CHAR(36) NOT NULL,
  `quantity` BIGINT NOT NULL,
  PRIMARY KEY (`warehouse_id`, `variation_sku`, `store_id`),
  CONSTRAINT `fk_variation_has_warehouse_warehouse1`
    FOREIGN KEY (`warehouse_id`)
    REFERENCES `warehouse` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stock_variation1`
    FOREIGN KEY (`variation_sku` , `store_id`)
    REFERENCES `variation` (`sku` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_variation_has_warehouse_warehouse1_idx` ON `stock` (`warehouse_id` ASC);

CREATE INDEX `fk_stock_variation1_idx` ON `stock` (`variation_sku` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attribute` (
  `id` CHAR(36) NOT NULL,
  `label` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `values` JSON NULL,
  `store_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `attribute_id_store_id_UNIQUE` ON `attribute` (`id` ASC, `store_id` ASC);


-- -----------------------------------------------------
-- Table `variation_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `variation_attribute` (
  `variation_sku` VARCHAR(80) NOT NULL,
  `variation_store_id` CHAR(36) NOT NULL,
  `attribute_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`variation_sku`, `variation_store_id`, `attribute_id`),
  CONSTRAINT `fk_variation_has_attribute_variation1`
    FOREIGN KEY (`variation_sku` , `variation_store_id`)
    REFERENCES `variation` (`sku` , `store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_variation_has_attribute_attribute1`
    FOREIGN KEY (`attribute_id`)
    REFERENCES `attribute` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_variation_attribute_attribute1_idx` ON `variation_attribute` (`attribute_id` ASC);

CREATE INDEX `fk_variation_attribute_variation1_idx` ON `variation_attribute` (`variation_sku` ASC, `variation_store_id` ASC);
