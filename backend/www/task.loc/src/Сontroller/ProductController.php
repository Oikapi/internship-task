<?php

class ProductController
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $statement = $this->pdo->query("SELECT * FROM products");
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get($id)
    {
        $statement = $this->pdo->prepare("SELECT * FROM products WHERE id = ?");
        $statement->execute([$id]);
        $product = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$product) {
            http_response_code(404);
            return ['error' => 'Product not found'];
        }

        return $product;
    }

    public function add($data)
    {
        if (!isset($data['name']) || !isset($data['price']) || !isset($data['email']) || !isset($data['count'])) {
            http_response_code(400);
            return ['error' => 'Missing required fields'];
        }
        $price = floatval($data['price']);
        $statement = $this->pdo->prepare("INSERT INTO products (name, price, email, count) VALUES (?, ?, ?, ?)");

        $success = $statement->execute([$data['name'], floatval($data['price']), $data['email'], $data['count']]);
    
        if (!$success) {
            http_response_code(500);
            return ['error' => 'Failed to add product'];
        }

        $id = $this->pdo->lastInsertId();   
        $statement = $this->pdo->prepare("SELECT * FROM products WHERE id = ?");
        $statement->execute([$id]);
        $product = $statement->fetch(PDO::FETCH_ASSOC);

        
        return $product;
    }

    public function edit($id, $data)
    {
        $existingProduct = $this->get($id);
        if (!$existingProduct) {
            http_response_code(404); 
            return ['error' => 'Product not found'];
        }

        
        $statement = $this->pdo->prepare("UPDATE products SET name = ?, price = ?, email = ?, count = ? WHERE id = ?");

        
        $success = $statement->execute([$data['name'], $data['price'], $data['email'], $data['count'], $id]);

        if (!$success) {
            http_response_code(500); 
            return ['error' => 'Failed to edit product'];
        }
        
        return ($this->get($id));
        
        
    }

    public function delete($id)
    {
            
        $existingProduct = $this->get($id);
        if (isset($existingProduct['error'])) {
            http_response_code(404); 
            return ['error' => 'Product not found'];
        }

        
        $statement = $this->pdo->prepare("DELETE FROM products WHERE id = ?");

        
        $success = $statement->execute([$id]);

        if ($success) {
            return ['message' => 'Product deleted successfully'];;
        }
    }
}
