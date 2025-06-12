<?php
class OrderService
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function saveOrder($userId, $cartItems)
    {
        try {
            $this->conn->beginTransaction();

            $stmt = $this->conn->prepare("INSERT INTO orders (user_id, created_at) VALUES (?, NOW())");
            $stmt->execute([$userId]);
            $orderId = $this->conn->lastInsertId();

            $stmt = $this->conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");

            foreach ($cartItems as $item) {
                $stmt->execute([$orderId, $item['id'], $item['quantity']]);
            }

            $this->conn->commit();
            return $orderId;
        } catch (Exception $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }
}
