<?php
// connection.php
include 'config.php';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  // Set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  error_log("Connection successful to database $dbname");
} catch (PDOException $e) {
  error_log("Connection failed: " . $e->getMessage());
  echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $e->getMessage()]);
  die();
}
?>
