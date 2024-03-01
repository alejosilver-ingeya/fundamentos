<?php
session_start();

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eureka";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario de inicio de sesión
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$password = $_POST['password'];

if ($email && !empty($password)) {
    // Consulta SQL para verificar las credenciales del usuario
    $stmt = $conn->prepare("SELECT * FROM tb_usuario WHERE correo_electronico=? AND clave=?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Inicio de sesión exitoso
        $_SESSION['email'] = $email;
        header("Location: bienvenida.html");
        exit(); // Importante: asegúrate de salir del script después de redirigir
    } else {
        // Inicio de sesión fallido
        echo "Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.";
    }
} else {
    // Datos de entrada inválidos
    echo "Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.";
}

// Cerrar conexión
$conn->close();
?>
