<?php

require_once 'src/Api/Api.php';
require_once 'src/Database/Database.php';
require_once 'src/Сontroller/ProductController.php';
require 'vendor/autoload.php';

$config = [
    'host' => 'mysql',
    'dbname' => getenv('MYSQL_DATABASE'),
    'username' => getenv('MYSQL_USER'),
    'password' => getenv('MYSQL_PASSWORD'),
    'charset' => 'utf8', 
];

$database = new Database($config);
$pdo = $database->getPdo();
$productController = new ProductController($database->getPdo());
$api = new Api($productController);

$api->handleRequest();
