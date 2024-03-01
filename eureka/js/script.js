function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultado = document.getElementById('resultado');
            resultado.innerHTML = xhr.responseText;
            if (xhr.responseText.trim() == "success") {
                window.location.href = "bienvenida.html";
            }
        }
    };
    xhr.send('email=' + email + '&password=' + password);
}
