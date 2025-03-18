//  Lista de amigos (almacena los nombres ingresados)
let listaAmigos = [];
const maxAmigos = 10; // Límite de participantes

// Expresión regular para validar nombres (solo letras y espacios, incluyendo tildes y ñ)
const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/; 

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let inputNombre = document.getElementById("amigo");
    let nombre = inputNombre.value.trim(); // Eliminamos espacios innecesarios

    // Validaciones antes de agregar el nombre
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }
    if (!regex.test(nombre)) {
        alert("El nombre solo debe contener letras y espacios.");
        return;
    }
    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya fue agregado.");
        return;
    }
    if (listaAmigos.length >= maxAmigos) {
        alert(`No puedes agregar más de ${maxAmigos} amigos.`);
        return;
    }

    // Agregar nombre a la lista
    listaAmigos.push(nombre);
    actualizarListaAmigos();
    inputNombre.value = ""; // Limpiar el campo de entrada después de agregar
}

//  Función para actualizar la lista de amigos en la interfaz
function actualizarListaAmigos() {
    let listaElement = document.getElementById("listaAmigos");
    listaElement.innerHTML = ""; // Limpiamos la lista antes de actualizar

    //  Bucle "for" para recorrer la lista de amigos y agregar cada uno como un <li>
    for (let i = 0; i < listaAmigos.length; i++) {
        let li = document.createElement("li");
        li.textContent = listaAmigos[i];

        // Botón para eliminar amigos de la lista
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.onclick = () => eliminarAmigo(i);

        li.appendChild(btnEliminar);
        listaElement.appendChild(li);
    }
}

//  Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    listaAmigos.splice(index, 1); // Eliminamos el amigo de la lista
    actualizarListaAmigos(); // Actualizar la lista en el DOM
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debes agregar al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Genera un índice aleatorio
    let amigoSecreto = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];

    //  Mostrar el resultado en la interfaz
    document.getElementById("resultado").textContent = `🎁 El amigo secreto es: ${amigoSecreto}`;

    // Reiniciar la lista después del sorteo
    resetear();
}

// Función para reiniciar la lista
function resetear() {
    listaAmigos = []; // Vaciamos el array
    document.getElementById("listaAmigos").innerHTML = ""; // Limpia la lista en la interfaz
    document.getElementById("resultado").textContent = ""; // Borrar el resultado 
}

// Permitir agregar nombres al presionar "Enter"
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});
