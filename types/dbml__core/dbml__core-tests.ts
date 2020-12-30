// Type definitions for @dbml/core v2.1.1
// Project: https://github.com/holistics/dbml
// Definitions by: Jacob Hearst https://github.com/JacobHearst
// Definitions: https://github.com/borisyankov/DefinitelyTyped

import { importer, exporter, Parser, ModelExporter } from 'dbml__core';

const mySQL = `CREATE TABLE 'users' (
    'id' int PRIMARY KEY AUTO_INCREMENT,
    'full_name' varchar(255),
    'created_at' timestamp,
    'country_code' int
  );

  CREATE TABLE 'countries' (
    'code' int PRIMARY KEY,
    'name' varchar(255),
    'continent_name' varchar(255)
  );

  CREATE TABLE 'order_items' (
    'order_id' int,
    'product_id' int,
    'quantity' int DEFAULT 1
  );

  CREATE TABLE 'orders' (
    'id' int PRIMARY KEY,
    'user_id' int UNIQUE NOT NULL,
    'status' varchar(255),
    'created_at' varchar(255) COMMENT 'When order created'
  );

  CREATE TABLE 'products' (
    'id' int PRIMARY KEY,
    'name' varchar(255),
    'merchant_id' int NOT NULL,
    'price' int,
    'status' ENUM ('out_of_stock', 'in_stock', 'running_low'),
    'created_at' datetime DEFAULT (now())
  );

  CREATE TABLE 'merchants' (
    'id' int,
    'country_code' int,
    'merchant_name' varchar(255),
    'created at' varchar(255),
    'admin_id' int,
    PRIMARY KEY ('id', 'country_code')
  );

  CREATE TABLE 'merchant_periods' (
    'id' int PRIMARY KEY,
    'merchant_id' int,
    'country_code' int,
    'start_date' datetime,
    'end_date' datetime
  );

  ALTER TABLE 'users' ADD FOREIGN KEY ('country_code') REFERENCES 'countries' ('code');

  ALTER TABLE 'merchants' ADD FOREIGN KEY ('country_code') REFERENCES 'countries' ('code');

  ALTER TABLE 'order_items' ADD FOREIGN KEY ('order_id') REFERENCES 'orders' ('id');

  ALTER TABLE 'order_items' ADD FOREIGN KEY ('product_id') REFERENCES 'products' ('id');

  ALTER TABLE 'merchants' ADD FOREIGN KEY ('admin_id') REFERENCES 'users' ('id');

  ALTER TABLE 'products' ADD FOREIGN KEY ('merchant_id') REFERENCES 'merchants' ('id');

  ALTER TABLE 'merchant_periods' ADD FOREIGN KEY ('merchant_id', 'country_code') REFERENCES 'merchants' ('id', 'country_code');

  CREATE INDEX 'product_status' ON 'products' ('merchant_id', 'status');

  CREATE UNIQUE INDEX 'products_index_1' ON 'products' ('id');`;

// Generate DBML from MySQL script
const dbml = importer.import(mySQL, 'mysql');

// Generate MySQL from DBML
const mysql = exporter.export(dbml, 'mysql');

// Parse DBML to Database object
const database = Parser.parse(dbml, 'dbml');

// Export Database object to PostgreSQL
let postgreSQL = ModelExporter.export(database, 'postgres', false);
// or
postgreSQL = ModelExporter.export(database.normalize(), 'postgres');
