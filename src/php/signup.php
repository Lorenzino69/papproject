<?php
// Gérer les requêtes préliminaires OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  exit(0);
}

// Définir les en-têtes pour toutes les autres requêtes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Inclure le fichier de connexion à la base de données
include 'config.php';

// Connexion à la base de données
try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  error_log("Connection successful to database $dbname");
} catch (PDOException $e) {
  error_log("Connection failed: " . $e->getMessage());
  echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $e->getMessage()]);
  die();
}

// Obtenir les données postées
$postData = file_get_contents("php://input");
error_log("Received post data: " . $postData);
$request = json_decode($postData);

if (isset($request->firstName) && isset($request->lastName) && isset($request->email) && isset($request->password)) {
  $name = $request->firstName;
  $lastName = $request->lastName; // Non utilisé car la colonne n'existe pas
  $email = $request->email;
  $pass = password_hash($request->password, PASSWORD_DEFAULT); // Hasher le mot de passe
  $morada = ''; // Vous pouvez définir une valeur par défaut pour morada

  error_log("Processing registration for: " . $email);

  // Vérifier si l'utilisateur existe déjà
  $sql = "SELECT * FROM `u_dados` WHERE u_email = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$email]);

  if ($stmt->rowCount() > 0) {
    error_log("User already exists: " . $email);
    echo json_encode(['status' => 'error', 'message' => 'O utilizador já existe']);
  } else {
    // Insérer un nouvel utilisateur
    $sql = "INSERT INTO `u_dados` (u_nome, u_email, u_morada, u_password) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$name, $email, $morada, $pass])) {
      error_log("User registered successfully: " . $email);
      echo json_encode(['status' => 'success', 'message' => 'Registado com sucesso!']);
    } else {
      $errorInfo = $stmt->errorInfo();
      error_log("Failed to register user: " . $email . " - Error: " . $errorInfo[2]);
      echo json_encode(['status' => 'error', 'message' => 'Erro ao registar. Por favor, tente novamente.']);
    }
  }
} else {
  error_log("Invalid input: " . $postData);
  echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
