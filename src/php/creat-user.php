<?php
// config.php
$host = 'localhost';
$dbname = 'nom_de_la_base_de_donnees';
$username = 'nom_utilisateur';
$password = 'mot_de_passe';

// connection.php
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

// signup.php
header("Content-Type: application/json");

// Include the database connection file
include 'connection.php';

// Get the posted data.
$postData = file_get_contents("php://input");
error_log("Received post data: " . $postData);
$request = json_decode($postData);

if (isset($request->firstName) && isset($request->lastName) && isset($request->email) && isset($request->password)) {
  $firstName = $request->firstName;
  $lastName = $request->lastName;
  $email = $request->email;
  $password = password_hash($request->password, PASSWORD_DEFAULT); // Hash the password

  error_log("Processing registration for: " . $email);

  $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  $stmt = $pdo->prepare($sql);

  if ($stmt->execute([$firstName, $lastName, $email, $password])) {
    error_log("User registered successfully: " . $email);
    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
  } else {
    $errorInfo = $stmt->errorInfo();
    error_log("Failed to register user: " . $email . " - Error: " . $errorInfo[2]);
    echo json_encode(['status' => 'error', 'message' => 'Failed to register user: ' . $errorInfo[2]]);
  }
} else {
  error_log("Invalid input: " . $postData);
  echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
