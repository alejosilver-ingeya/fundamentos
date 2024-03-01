<?php
// Conectarse a la base de datos
$conexion = new mysqli("localhost", "root", "", "eureka");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Consulta SQL para obtener los clientes
$sql = "SELECT * FROM tb_cliente";
$resultado = $conexion->query($sql);

// Crear un array para almacenar los datos de los clientes
$clientes = array();

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $clientes[] = $fila;
    }
}

// Devolver los datos en formato JSON
echo json_encode($clientes);

// Cerrar la conexión
$conexion->close();
?>
