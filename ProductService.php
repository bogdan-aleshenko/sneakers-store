<?php
class ProductService
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllProducts()
    {
        $stmt = $this->conn->query("SELECT id, name, price, image FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
