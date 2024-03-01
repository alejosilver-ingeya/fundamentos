// Hacer una solicitud AJAX para obtener los datos de los clientes
var xhr = new XMLHttpRequest();
xhr.open('GET', 'cliente.php', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var clientes = JSON.parse(xhr.responseText);
        mostrarClientes(clientes);
    }
};
xhr.send();

// Función para mostrar los clientes en la tabla
function mostrarClientes(clientes) {
    var tbody = document.querySelector('#tabla-clientes tbody');
    clientes.forEach(function(cliente) {
        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nombre_cliente}</td>
            <td>${cliente.direccion_cliente}</td>
            <td>${cliente.telefono_cliente}</td>
            <td>${cliente.correo_electronico}</td>
            <td>
                <a href="#" class="btn-edit">Editar</a>
                <a href="#" class="btn-delete">Eliminar</a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.querySelector('.btn-create').addEventListener('click', function() {
    document.getElementById('modal-crear-cliente').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal-crear-cliente').style.display = 'none';
});

document.getElementById('form-crear-cliente').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página
    // Obtener los datos del formulario
    let nombre = document.getElementById('nombre').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;

    // Enviar los datos al backend
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'cliente.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Limpiar el formulario
                document.getElementById('form-crear-cliente').reset();
                // Ocultar el modal
                document.getElementById('modal-crear-cliente').style.display = 'none';
                // Actualizar la tabla de clientes
                // (puedes llamar a una función que actualice la tabla)
            } else {
                console.error('Hubo un error al guardar el cliente.');
            }
        }
    };
    xhr.send(JSON.stringify({ nombre, direccion, telefono, correo }));
});

// Mostrar modal para crear cliente al hacer clic en el botón
document.querySelector('.btn-create').addEventListener('click', function() {
    document.getElementById('modal-crear-cliente').style.display = 'block';
});

// Ocultar modal al hacer clic en el botón de cerrar
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('modal-crear-cliente').style.display = 'none';
});
